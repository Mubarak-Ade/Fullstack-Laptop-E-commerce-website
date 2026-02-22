import createHttpError from 'http-errors';
import Order from '../../models/Order.js';
import CartService from './cart.service.js';
import { generateOrderNumber } from '../../helper/genRandomNum.js';
class OrderService {
    static async createOrderFromSnapshot(identity, shippingInfo) {
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
        const order = identity.type === 'user' &&
            (await Order.create({
                orderNumber: generateOrderNumber(),
                userId: identity.userId,
                ...orderCreate,
            }));
        return order;
    }
    static async getUserOrder(user) {
        if (!user) {
            throw createHttpError(403, 'Unauthorize User');
        }
        const order = await Order.find({ userId: user }).lean();
        return order;
    }
    static async getSingleOrder(orderId, user) {
        const order = await Order.findById(orderId);
        if (!order) {
            throw createHttpError(404, 'order does not exist');
        }
        if (order.userId?.toString() !== user) {
            throw createHttpError(403, 'Forbidden');
        }
        return order;
    }
}
export default OrderService;
