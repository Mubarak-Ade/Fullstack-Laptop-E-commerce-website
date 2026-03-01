import { RequestHandler } from 'express';
import { PaymentService } from '../services/payment.service.js';

export const initialize: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const userId = req.user?.id as string;
        const { orderId, paymentMethod, method } = req.body;
        const selectedMethod = paymentMethod ?? method;

        const payment = await PaymentService.initializePayment(
            orderId,
            userId,
            selectedMethod
        );
        res.status(200).json(payment);
    } catch (error) {
        next(error);
    }
};

export const confirmFakePayment : RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const confirm = await PaymentService.confirmFakePayment(req.body.reference, req.user?.id as string)
    res.status(200).json(confirm);
  } catch (error) {
    next(error);
  }
};

export const paystackWebHook: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const signature = req.headers['x-paystack-signature'] as string;
        const rawBody = Buffer.isBuffer(req.body)
            ? req.body
            : Buffer.from(JSON.stringify(req.body || {}));
        const result = await PaymentService.handlePaystackWebhook(rawBody, signature);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
