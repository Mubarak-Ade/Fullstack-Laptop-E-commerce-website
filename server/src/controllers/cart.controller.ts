import { RequestHandler } from 'express';
import Cart from '../models/Cart.js';
import CartService from '../services/cart.service.js';
import createHttpError from 'http-errors';

const resolveIdentity = (req: any) => {
    if (req.user?.id) {
        return { type: 'user', userId: req.user.id } as const;

    }

    if (req.headers['x-guest-id']) {
        return {
            type: 'guest',
            guestId: String(req.headers['x-guest-id']),
        } as const;
    }

    throw createHttpError(401, 'Identity not found');
};

export const getCart: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const cart = await Cart.find().lean();
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

export const getCartItems: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const identity = resolveIdentity(req);
        const cart = await CartService.getUserCart(identity);
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

export const addItemsToCart: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const identity = resolveIdentity(req);
        const cart = await CartService.addToCart(req.body, identity);
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

export const deleteCartItem: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const identity = resolveIdentity(req);
        const cart = await CartService.deleteItem(identity, req.body.productId);
        res.status(200).json({ cart });
    } catch (error) {
        next(error);
    }
};

export const inputQuantity: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const identity = resolveIdentity(req);
        const { productId, quantity = 0 } = req.body;
        const cart = await CartService.updateItem({ identity, productId, quantity });
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};
