import { RequestHandler } from 'express';
import UserServices from '../services/user.service.js';
import CartService from '../services/cart.service.js';
import createHttpError from 'http-errors';

export const register: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const user = await UserServices.regiserUser(req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
export const login: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const user = await UserServices.loginUser(req.body);
        const guest = req.headers['x-guest-id'] as string
        const cart = await CartService.mergeCart(guest, user.id as string);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
