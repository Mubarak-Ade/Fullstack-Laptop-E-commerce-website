import { Router } from 'express';
import { createProduct, deleteProductController, getProductDetail, getProducts, getSingleProduct, updateProductController } from '../controllers/productController.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getSingleProduct);
router.get('/:slug', getProductDetail);
router.put('/:id', upload.array("images", 5), updateProductController)
router.post('/', upload.array("images", 5), createProduct);
router.delete('/:id', deleteProductController)

export default router;