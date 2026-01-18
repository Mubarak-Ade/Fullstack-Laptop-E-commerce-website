import { Router } from 'express';
import { createProduct, getProducts, getSingleProduct } from '../controllers/productController.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getSingleProduct);
router.post('/', upload.array("images", 5), createProduct);

export default router;