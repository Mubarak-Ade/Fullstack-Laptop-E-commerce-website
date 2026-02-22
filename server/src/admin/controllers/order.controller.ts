import { RequestHandler } from 'express';
import AdminOrderServices from '../services/order.service.js';

export const getAdminDashboard: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const dashboard = await AdminOrderServices.getDashboard();
        res.status(200).json(dashboard);
    } catch (error) {
        next(error);
    }
};

export const getOrders: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const order = await AdminOrderServices.getOrders(req.query);
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

export const getOrder: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const order = await AdminOrderServices.getOrderById(req.params.id as string);
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const id = req.params.id as string;
        const status = req.body.status;
        const order = await AdminOrderServices.updateOrderStatus(id, status);
        res.status(200).json({ success: true, order });
    } catch (error) {
        next(error);
    }
};

export const updateManyOrderStatus: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const orderIds = req.body.orderIds as string[];
        const status = req.body.status;
        const updatedCount = await AdminOrderServices.updateOrdersStatus(orderIds, status);
        res.status(200).json({ success: true, updatedCount });
    } catch (error) {
        next(error);
    }
};

export const deleteOrder: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const order = await AdminOrderServices.deleteOrder(req.params.id as string);
        res.status(200).json({ success: true, order });
    } catch (error) {
        next(error);
    }
};

export const deleteManyOrders: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const orderIds = req.body.orderIds as string[];
        const deletedCount = await AdminOrderServices.deleteMany(orderIds);
        res.status(200).json({ success: true, deletedCount });
    } catch (error) {
        next(error);
    }
};
