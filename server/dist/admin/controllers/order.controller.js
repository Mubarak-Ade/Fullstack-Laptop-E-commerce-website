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
