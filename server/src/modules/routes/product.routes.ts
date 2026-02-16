import { Router } from 'express';
import { authorizeRole, requireAuth } from '../../middlewares/authorization.js';
import { uploadProduct } from '../../middlewares/upload.js';
import { getProductDetail, getProducts, getSingleProduct } from '../controllers/product.controller.js';

const router = Router();

router.get('/', getProducts);
router.get('/id/:id', getSingleProduct);
router.get('/slug/:slug', getProductDetail);


export default router;
