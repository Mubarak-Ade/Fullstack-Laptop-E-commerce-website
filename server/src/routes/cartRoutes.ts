import { Router } from 'express';
import { addItemsToCart, deleteCartItem, getCartItems, getUserCart, inputQuantity } from '../controllers/cartController.js';

const router = Router();

router.get('/', getCartItems);
router.get('/:guestId', getUserCart);
router.post('/', addItemsToCart);
// router.post('/cart/inc', increaseQuantity)
// router.post('/cart/inc', decreaseQuantity)
router.post('/item/quantity', inputQuantity)
router.delete('/item/remove', deleteCartItem);

export default router;
