import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import axios from 'axios';
import crypto from 'crypto';

import Order from '../../models/Order.js';
import Product from '../../models/Product.js';
import CartService from './cart.service.js';
import env from '../../env.js';

type PaymentMethod = 'FAKE' | 'PAYSTACK';

async function supportsTransactions(): Promise<boolean> {
    try {
        const admin = mongoose.connection.db?.admin();
        const hello = await admin?.command({ hello: 1 });
        return Boolean(hello?.setName || hello?.msg === 'isdbgrid');
    } catch {
        return false;
    }
}

export class PaymentService {
    /* =========================================
     PUBLIC ENTRY POINT
  ========================================= */

    static async initializePayment(orderId: string, userId: string, method: PaymentMethod) {
        if (!orderId || !method)
            throw createHttpError(400, 'Order ID and payment method are required');

        if (!userId) throw createHttpError(401, 'Unauthorized');

        if (method === 'FAKE') {
            return this.initializeFakePayment(orderId, userId);
        }

        if (method === 'PAYSTACK') {
            return this.initializePaystackPayment(orderId, userId);
        }

        throw createHttpError(400, 'Invalid payment method');
    }

    /* =========================================
     FAKE PAYMENT
  ========================================= */

    private static async initializeFakePayment(orderId: string, userId: string) {
        const order = await Order.findById(orderId);

        if (!order) throw createHttpError(404, 'Order not found');

        if (order.userId?.toString() !== userId) throw createHttpError(403, 'Unauthorized');

        if (order.status !== 'PENDING_PAYMENT')
            throw createHttpError(400, 'Order not pending payment');

        const reference = `FAKE_${Date.now()}`;

        order.paymentProvider = 'FAKE';
        order.paymentReference = reference;
        await order.save();

        return {
            provider: 'FAKE',
            reference,
            redirectUrl: `http://localhost:5000/api/payment/fake/confirm?ref=${reference}`,
        };
    }

    static async confirmFakePayment(reference: string, userId: string) {
        const canUseTransactions = await supportsTransactions();

        if (!reference) throw createHttpError(400, 'Payment reference is required');

        if (!userId) throw createHttpError(401, 'Unauthorized');

        if (!canUseTransactions) {
            return this.applyPayment(reference, userId);
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const result = await this.applyPayment(reference, userId, session);
            await session.commitTransaction();
            return result;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    /* =========================================
     PAYSTACK INITIALIZATION
  ========================================= */

    private static async initializePaystackPayment(orderId: string, userId: string) {
        const order = await Order.findById(orderId);

        if (!order) throw createHttpError(404, 'Order not found');

        if (order.userId?.toString() !== userId) throw createHttpError(403, 'Unauthorized');

        if (order.status !== 'PENDING_PAYMENT')
            throw createHttpError(400, 'Order not pending payment');

        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                email: order.shippingAddress?.email,
                amount: Number((order.total) * 100).toFixed(0),
                metadata: { orderId: order._id.toString() },
                callback_url: `${env.CLIENT_URL}/order/${order._id}`,
            },
            {
                headers: {
                    Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = response.data.data;

        order.paymentProvider = 'PAYSTACK';
        order.paymentReference = data.reference;
        await order.save();

        return {
            provider: 'PAYSTACK',
            authorization_url: data.authorization_url,
        };
    }

    /* =========================================
     PAYSTACK WEBHOOK HANDLER
  ========================================= */

    static async handlePaystackWebhook(rawBody: Buffer, signature: string | undefined) {
        const hash = crypto
            .createHmac('sha512', env.PAYSTACK_SECRET_KEY)
            .update(rawBody)
            .digest('hex');

        if (hash !== signature) {
            throw createHttpError(401, 'Invalid Paystack signature');
        }

        let body: any;
        try {
            body = JSON.parse(rawBody.toString('utf8'));
        } catch {
            throw createHttpError(400, 'Invalid webhook payload');
        }

        if (body.event !== 'charge.success') {
            return { received: true };
        }

        const reference = body.data.reference;

        const canUseTransactions = await supportsTransactions();

        if (!canUseTransactions) {
            return this.applyPayment(reference);
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const result = await this.applyPayment(reference, undefined, session);
            await session.commitTransaction();
            return result;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    /* =========================================
     CORE PAYMENT LOGIC (USED BY BOTH)
  ========================================= */

    private static async applyPayment(
        reference: string,
        userId?: string,
        session?: mongoose.ClientSession
    ) {
        const sessionOptions = session ? { session } : undefined;

        const order = await Order.findOne({ paymentReference: reference }, null, sessionOptions);

        if (!order) throw createHttpError(404, 'Order not found');

        if (userId && order.userId?.toString() !== userId)
            throw createHttpError(403, 'Unauthorized');

        // Prevent double processing
        if (order.status !== 'PENDING_PAYMENT') {
            return { success: true };
        }

        for (const item of order.products) {
            const product = await Product.findOneAndUpdate(
                {
                    _id: item.productId,
                    stocks: { $gte: item.quantity },
                },
                { $inc: { stocks: -item.quantity } },
                { new: true, ...sessionOptions }
            );

            if (!product) {
                order.status = 'CANCELLED';
                order.paymentStatus = 'FAILED';
                await order.save(sessionOptions);
                return { success: false, message: 'Insufficient stock' };
            }
        }

        order.status = 'PROCESSING';
        order.paymentStatus = 'PAID';
        order.paidAt = new Date();
        await order.save(sessionOptions);

        await CartService.clearCart(String(order.userId), session);

        return { success: true };
    }
}
