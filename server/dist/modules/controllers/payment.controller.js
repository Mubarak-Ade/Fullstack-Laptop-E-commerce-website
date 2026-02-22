import { PaymentService } from '../services/payment.service.js';
export const initializeFakePayment = async (req, res, next) => {
    try {
        const payment = await PaymentService.initializeFakePayment(req.body.orderId, req.user?.id);
        res.status(200).json(payment);
    }
    catch (error) {
        next(error);
    }
};
export const confirmeFakePayment = async (req, res, next) => {
    try {
        const confirm = await PaymentService.confirmFakePayment(req.body.reference, req.user?.id);
        res.status(200).json(confirm);
    }
    catch (error) {
        next(error);
    }
};
