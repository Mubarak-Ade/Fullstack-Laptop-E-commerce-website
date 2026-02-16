import { Router } from 'express';
import { getAdminDashboard } from '../controllers/order.controller.js';
import productRoutes from "./product.routes.js"
import orderRoutes from "./order.routes.js"

const router = Router();

router.route('/dashboard').get(getAdminDashboard);
router.use('/products', productRoutes)
router.use('/orders', orderRoutes)

export default router;