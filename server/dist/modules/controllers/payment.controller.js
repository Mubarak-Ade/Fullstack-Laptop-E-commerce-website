import { PaymentService } from '../services/payment.service.js';
export const initialize = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const { orderId, paymentMethod, method } = req.body;
        const selectedMethod = paymentMethod ?? method;
        const payment = await PaymentService.initializePayment(orderId, userId, selectedMethod);
        res.status(200).json(payment);
    }
    catch (error) {
        next(error);
    }
};
export const confirmFakePayment = async (req, res, next) => {
    try {
        const confirm = await PaymentService.confirmFakePayment(req.body.reference, req.user?.id);
        res.status(200).json(confirm);
    }
    catch (error) {
        next(error);
    }
};
export const paystackWebHook = async (req, res, next) => {
    try {
        const signature = req.headers['x-paystack-signature'];
        const rawBody = Buffer.isBuffer(req.body)
            ? req.body
            : Buffer.from(JSON.stringify(req.body || {}));
        const result = await PaymentService.handlePaystackWebhook(rawBody, signature);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
