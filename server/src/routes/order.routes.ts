import { Router } from 'express';
import { createOrder, getOrders, getSingleOrder } from '../controllers/order.controller.js';

const router = Router();

router.route('/').post(createOrder).get(getOrders);
router.route('/:orderId').get(getSingleOrder)

export default router;