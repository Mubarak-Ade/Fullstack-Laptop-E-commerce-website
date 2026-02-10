import { Router } from 'express';
import { createProduct, deleteProductController, getProductDetail, getProducts, getSingleProduct, updateProductController } from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.js';
import { authorizeRole, requireAuth } from '../middlewares/authorization.js';

const router = Router();

router.get('/', getProducts);
router.get('/id/:id', getSingleProduct);
router.get('/slug/:slug', getProductDetail);
router.use(requireAuth, authorizeRole)
router.put('/:id', upload("products",).array("images", 5), updateProductController)
router.post('/', upload("products").array("images", 5), createProduct);
router.delete('/:id', deleteProductController)

export default router;