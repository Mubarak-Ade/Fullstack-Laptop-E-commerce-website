import OrderService from '../services/order.service.js';
import resolveIdentity from '../helper/resolveIdentity.js';
import { OrderSchema } from '../schema/order.schema.js';
import createHttpError from 'http-errors';
export const createOrder = async (req, res, next) => {
    try {
        const identity = resolveIdentity(req);
        const parse = OrderSchema.safeParse(req.body);
        if (!parse.success) {
            console.error('Validation errors:', parse.error.flatten());
            throw createHttpError(400, parse.error.flatten());
        }
        const order = await OrderService.createOrderFromSnapshot(identity, parse.data);
        res.status(200).json(order);
    }
    catch (error) {
        next(error);
    }
};
export const getOrders = async (req, res, next) => {
    try {
        console.log(req.user?.id);
        const order = await OrderService.getUserOrder(req.user?.id);
        res.status(200).json(order);
    }
    catch (error) {
        next(error);
    }
};
export const getSingleOrder = async (req, res, next) => {
    try {
        const order = await OrderService.getSingleOrder(req.params.orderId, req.user?.id);
        res.status(200).json(order);
    }
    catch (error) {
        next(error);
    }
};
