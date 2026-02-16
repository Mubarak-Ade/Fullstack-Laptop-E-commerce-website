import Cart from '../models/Cart.js';
import CartService from '../services/cart.service.js';
import resolveIdentity from '../helper/resolveIdentity.js';
export const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.find().lean();
        res.status(200).json(cart);
    }
    catch (error) {
        next(error);
    }
};
export const getCartItems = async (req, res, next) => {
    try {
        const identity = resolveIdentity(req);
        const cart = await CartService.getUserCart(identity);
        res.status(200).json(cart);
    }
    catch (error) {
        next(error);
    }
};
export const addItemsToCart = async (req, res, next) => {
    try {
        const identity = resolveIdentity(req);
        const cart = await CartService.addToCart(req.body, identity);
        res.status(200).json(cart);
    }
    catch (error) {
        next(error);
    }
};
export const deleteCartItem = async (req, res, next) => {
    try {
        const identity = resolveIdentity(req);
        const cart = await CartService.deleteItem(identity, req.body.productId);
        res.status(200).json({ cart });
    }
    catch (error) {
        next(error);
    }
};
export const inputQuantity = async (req, res, next) => {
    try {
        const identity = resolveIdentity(req);
        const { productId, quantity = 0 } = req.body;
        const cart = await CartService.updateItem({ identity, productId, quantity });
        res.status(200).json(cart);
    }
    catch (error) {
        next(error);
    }
};
export const CheckoutController = async (req, res, next) => {
    try {
        const identity = resolveIdentity(req);
        const checkout = await CartService.CheckoutSnapShot(identity);
        res.status(200).json(checkout);
    }
    catch (error) {
        next(error);
    }
};
