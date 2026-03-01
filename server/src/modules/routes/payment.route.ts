import { Router } from 'express';
import {
    confirmFakePayment,
    initialize,
    paystackWebHook,
} from '../controllers/payment.controller.js';
import { requireAuth } from '../../middlewares/authorization.js';

const router = Router();

router.route('/webhook/paystack').post(paystackWebHook);
router.use(requireAuth);
router.route('/initialize').post(initialize);
router.route('/fake/confirm').post(confirmFakePayment);

export default router;
