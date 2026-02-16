import { Router } from 'express';
import { confirmeFakePayment, initializeFakePayment } from '../controllers/payment.controller.js';
const router = Router();
router.route('/fake/initialize').post(initializeFakePayment);
router.route('/fake/confirm').post(confirmeFakePayment);
export default router;
