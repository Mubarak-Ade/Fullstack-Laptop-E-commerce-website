import { Router } from 'express';
import { createOrder, getOrders, getSingleOrder } from '../controllers/order.controller.js';
import { requireAuth } from '../../middlewares/authorization.js';

const router = Router();

router.use(requireAuth);

router.route('/').post(createOrder).get(getOrders);
router.route('/:orderId').get(getSingleOrder);

export default router;
