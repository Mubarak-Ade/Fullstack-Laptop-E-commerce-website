import { Router } from 'express';
import { authorizeRole, requireAuth } from '../../middlewares/authorization.js';
import { upload } from '../../middlewares/multer.js';
import { createProduct, deleteProductController, updateProductController } from '../../admin/controllers/product.controller.js';
import { getProducts } from '../controllers/product.controller.js';
import { uploadProduct } from '../../middlewares/upload.js';

const router = Router();

router.use(requireAuth, authorizeRole);
router.get('/', getProducts);
router.put('/:id', uploadProduct.array("product", 5), updateProductController);
router.post('/', uploadProduct.array("product", 5), createProduct);
router.delete('/:id', deleteProductController);

export default router;