import { Router } from 'express';
import { getOrders } from '../controllers/order.controller.js';

const router = Router();

router.route('/').get(getOrders);

export default router;