import createHttpError from 'http-errors';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';
import CartService from './cart.service.js';

async function supportsTransactions(): Promise<boolean> {
    try {
        const admin = mongoose.connection.db.admin();
        const hello = await admin.command({ hello: 1 });
        return Boolean(hello.setName || hello.msg === 'isdbgrid');
    } catch {
        return false;
    }
}

export class PaymentService {
    static async initializeFakePayment(orderId: string, userId: string) {
        const order = await Order.findById(orderId);

        if (!order) {
            throw createHttpError(404, 'Order Not Found');
        }

        if (order.userId?.toString() !== userId) {
            throw createHttpError(403, 'Not Authorize to pay for this order');
        }

        if (order.status !== 'PENDING_PAYMENT') {
            throw createHttpError(400, 'Order is not Pending payment');
        }

        if (order.paymentReference) {
            throw createHttpError(400, 'Payment already initialized for this order');
        }

        const reference = `FAKE_${Date.now()}`;
        order.paymentProvider = 'FAKE';
        order.paymentReference = reference;
        await order.save();

        return {
            provider: 'FAKE',
            reference,
            redirectUrl: `http://localhost/api/payment/fake?ref=${reference}`,
        };
    }

    static async confirmFakePayment(reference: string, userId: string) {
        const canUseTransactions = await supportsTransactions();

        if (!canUseTransactions) {
            return PaymentService.applyPayment(reference, userId);
        }

        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const result = await PaymentService.applyPayment(reference, userId, session);
            await session.commitTransaction();
            return result;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    private static async applyPayment(
        reference: string,
        userId: string,
        session?: mongoose.ClientSession,
    ) {
        const sessionOptions = session ? { session } : undefined;
        const order = await Order.findOne({ paymentReference: reference }, null, sessionOptions);

        if (!order) {
            throw createHttpError(404, 'Order Not Found');
        }

        if (order.userId?.toString() !== userId) {
            throw createHttpError(401, 'user not authorize');
        }

        if (order?.status !== 'PENDING_PAYMENT') {
            return { success: true };
        }

        for (const items of order.products) {
            const product = session
                ? await Product.findById(items.productId).session(session)
                : await Product.findById(items.productId);

            if (!product || product.stocks < items.quantity) {
                order.status = 'CANCELLED';
                await order.save(sessionOptions);
                return { success: false, message: 'Insufficient Stocks' };
            }

            product.stocks -= items.quantity;

            await product.save(sessionOptions);
        }

        order.status = 'PAID';
        order.paidAt = new Date();
        await order.save(sessionOptions);

        order.status = 'PROCESSING';
        await order.save(sessionOptions);

        await CartService.clearCart(String(order.userId), session);

        return { success: true };
    }
}
