import { Router } from 'express';
import { createProduct, deleteProductController, getProductDetail, getProducts, getSingleProduct, updateProductController } from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.js';
import { authorizeRole, requireAuth } from '../middlewares/authorization.js';
const router = Router();
router.get('/', getProducts);
router.get('/id/:id', getSingleProduct);
router.get('/slug/:slug', getProductDetail);
export default router;
