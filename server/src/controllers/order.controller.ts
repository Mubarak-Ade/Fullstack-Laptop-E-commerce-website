import { SiIos } from "react-icons/si"; 
import { RequestHandler } from 'express';
import OrderService from '../services/order.service.js';
import resolveIdentity from '../helper/resolveIdentity.js';
import Order from '../models/Order.js';
import { OrderSchema } from '../schema/order.schema.js';
import createHttpError from 'http-errors';

export const createOrder: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const identity = resolveIdentity(req);
        const parse = OrderSchema.safeParse(req.body);
        if (!parse.success) {
            console.error('Validation errors:', parse.error.flatten());
            throw createHttpError(400, parse.error.flatten());
        }
        const order = await OrderService.createOrderFromSnapshot(identity, parse.data);
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

export const getOrders: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        console.log(req.user?.id);
        const order = await OrderService.getUserOrder(req.user?.id as string);
        
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};
export const getSingleOrder: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const order = await OrderService.getSingleOrder(
            req.params.orderId as string,
            req.user?.id as string
        );
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};
