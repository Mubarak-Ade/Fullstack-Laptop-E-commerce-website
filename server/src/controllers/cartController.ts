import { RequestHandler } from 'express';
import Cart from '../models/Cart.js';
import {
    addToCartService,
    deleteCartItemService,
    getUserCartService,
    updateCartItemService,
} from '../services/cart.service.js';
import { CartService } from '../services/cart.service.js';

export const getCartItems: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const cart = await Cart.find().lean();
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

export const getUserCart: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const guestId = req.params.guestId as string;
        const cart = await CartService.getUserCart(guestId)
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

export const addItemsToCart: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const cart = await CartService.addToCart(req.body);
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

export const deleteCartItem: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { guestId, productId } = req.body;
        const cart = await CartService.deleteItem(guestId, productId);
        res.status(200).json({ cart });
    } catch (error) {
        next(error);
    }
};

export const inputQuantity: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { guestId, productId, quantity = 0 } = req.body;
        const cart = await CartService.updateItem({ guestId, productId, quantity });
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};
