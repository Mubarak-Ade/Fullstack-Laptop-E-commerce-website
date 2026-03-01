import { Router } from 'express';
import { addItemsToCart, CheckoutController, clearCart, deleteCartItem, getCart, getCartItems, inputQuantity, } from '../controllers/cart.controller.js';
import { requireAuth } from '../../middlewares/authorization.js';
const router = Router();
router.get('/items', getCartItems);
router.get('/', getCart);
router.post('/items', addItemsToCart);
// router.post('/cart/inc', increaseQuantity)
// router.post('/cart/inc', decreaseQuantity)
router.post('/item/quantity', inputQuantity);
router.delete('/item/remove', deleteCartItem);
router.delete('/clear', requireAuth, clearCart);
router.get('/checkout', requireAuth, CheckoutController);
export default router;
