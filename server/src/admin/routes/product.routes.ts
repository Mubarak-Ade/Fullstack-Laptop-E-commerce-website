import { Router } from 'express';
import { authorizeRole, requireAuth } from '../../middlewares/authorization.js';
import { upload } from '../../middlewares/multer.js';
import { createProduct, deleteProductController, updateProductController } from '../../admin/controllers/product.controller.js';
import { getProducts } from '../controllers/product.controller.js';

const router = Router();

router.use(requireAuth, authorizeRole);
router.get('/', getProducts);
router.put('/:id', upload("products").array("images", 5), updateProductController);
router.post('/', upload("products").array("images", 5), createProduct);
router.delete('/:id', deleteProductController);

export default router;