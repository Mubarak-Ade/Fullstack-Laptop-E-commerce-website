import AdminOrderServices from '../services/order.service.js';
export const getAdminDashboard = async (req, res, next) => {
    try {
        const dashboard = await AdminOrderServices.getDashboard();
        res.status(200).json(dashboard);
    }
    catch (error) {
        next(error);
    }
};
export const getOrders = async (req, res, next) => {
    try {
        const order = await AdminOrderServices.getOrders(req.query);
        res.status(200).json(order);
    }
    catch (error) {
        next(error);
    }
};
export const getOrder = async (req, res, next) => {
    try {
        const order = await AdminOrderServices.getOrderById(req.params.id);
        res.status(200).json(order);
    }
    catch (error) {
        next(error);
    }
};
export const updateOrderStatus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const order = await AdminOrderServices.updateOrderStatus(id, status);
        res.status(200).json({ success: true, order });
    }
    catch (error) {
        next(error);
    }
};
export const updateManyOrderStatus = async (req, res, next) => {
    try {
        const orderIds = req.body.orderIds;
        const status = req.body.status;
        const updatedCount = await AdminOrderServices.updateOrdersStatus(orderIds, status);
        res.status(200).json({ success: true, updatedCount });
    }
    catch (error) {
        next(error);
    }
};
export const deleteOrder = async (req, res, next) => {
    try {
        const order = await AdminOrderServices.deleteOrder(req.params.id);
        res.status(200).json({ success: true, order });
    }
    catch (error) {
        next(error);
    }
};
export const deleteManyOrders = async (req, res, next) => {
    try {
        const orderIds = req.body.orderIds;
        const deletedCount = await AdminOrderServices.deleteMany(orderIds);
        res.status(200).json({ success: true, deletedCount });
    }
    catch (error) {
        next(error);
    }
};
