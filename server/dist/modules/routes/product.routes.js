import { Router } from 'express';
import { getProductDetail, getProducts, getSingleProduct } from '../controllers/product.controller.js';
const router = Router();
router.get('/', getProducts);
router.get('/id/:id', getSingleProduct);
router.get('/slug/:slug', getProductDetail);
export default router;
