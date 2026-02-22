import { Router } from 'express';
import { deleteManyOrders, deleteOrder, getOrder, getOrders, updateManyOrderStatus, updateOrderStatus } from '../controllers/order.controller.js';

const router = Router();

router.route('/').get(getOrders).patch(updateManyOrderStatus).delete(deleteManyOrders);
router.route('/:id').get(getOrder).patch(updateOrderStatus).delete(deleteOrder);

export default router;