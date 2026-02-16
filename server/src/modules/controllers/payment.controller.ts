import { RequestHandler } from 'express';
import { PaymentService } from '../services/payment.service.js';

export const initializeFakePayment: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const payment = await PaymentService.initializeFakePayment(
            req.body.orderId,
            req.user?.id as string
        );
        res.status(200).json(payment);
    } catch (error) {
        next(error);
    }
};

export const confirmeFakePayment : RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const confirm = await PaymentService.confirmFakePayment(req.body.reference, req.user?.id as string)
    res.status(200).json(confirm);
  } catch (error) {
    next(error);
  }
};