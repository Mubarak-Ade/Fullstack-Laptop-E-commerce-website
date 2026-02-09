import createHttpError from 'http-errors';
import Order from '../models/Order.js';
import { OrderDTO } from '../schema/order.schema.js';
import CartService from './cart.service.js';

type UserType = { type: 'user'; userId: string } | { type: 'guest'; guestId: string };

class OrderService {
    static async createOrderFromSnapshot(identity: UserType, shippingInfo: OrderDTO) {
        const checkout = await CartService.CheckoutSnapShot(identity);

        const items = checkout.items.map(item => ({
            productId: item.productId,
            productName: item.name,
            quantity: item.quantity,
            image: item.image,
            unitPriceAtPurchase: item.unitPriceAtCheckout,
        }));

        const orderCreate = {
            products: items,
            tax: checkout.tax,
            subTotal: checkout.subTotal,
            total: checkout.total,
            shippingFee: checkout.shipping,
            shippingMethod: shippingInfo.shippingMethod,
            shippingAddress: {
                fullName: `${shippingInfo.firstname} ${shippingInfo.lastname}`,
                phone: shippingInfo.phone,
                email: shippingInfo.email,
                state: shippingInfo.state,
                address: shippingInfo.address,
                city: shippingInfo.city,
                postalCode: shippingInfo.postalCode,
                country: shippingInfo.country,
            },
            status: 'PENDING_PAYMENT',
        };

        const order = identity.type === 'user' && await Order.create({ userId: identity.userId, ...orderCreate });

        return order;
    }

    static async getUserOrder (user: string) {
        const order = await Order.find({userId: user})
        return order
    }

    static async getSingleOrder (orderId: string, user: string) {
        const order = await Order.findById(orderId)

        if(!order) {
            throw createHttpError(404, "order does not exist")
        }

        if (order.userId?.toString() !== user) {
            throw createHttpError(403, "Forbidden")
        }

        return order
    }
}

export default OrderService;
