import createHttpError from 'http-errors';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';
import CartService from './cart.service.js';

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

    static async confirmFakePayment(reference: string) {

        try {
            const order = await Order.findOne({ paymentReference: reference });

            if (!order) {
                throw createHttpError(404, 'Order Not Found');
            }

            if (order?.status !== 'PENDING_PAYMENT') {
                return { success: true };
            }

            for (const items of order.products) {
                const product = await Product.findById(items.productId);

                if (!product || product.stocks < items.quantity) {
                    order.status = 'CANCELLED';
                    await order.save();
                    return { success: false, message: 'Insufficient Stocks' };
                }

                product.stocks -= items.quantity;

                await product.save();
            }

            order.status = 'PAID';
            order.paidAt = new Date();
            await order.save();

            order.status = 'PROCESSING';
            await order.save();


            await CartService.clearCart(String(order.userId))

            return { success: true };
        } catch (error) {
            console.error(error)
        }
    }
}
