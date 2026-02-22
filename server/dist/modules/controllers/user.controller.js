import UserServices from '../services/user.service.js';
import CartService from '../services/cart.service.js';
export const register = async (req, res, next) => {
    try {
        const user = await UserServices.regiserUser(req.body);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const user = await UserServices.loginUser(req.body);
        const guest = req.headers['x-guest-id'];
        const cart = await CartService.mergeCart(guest, user.id.toString());
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
export const getUser = async (req, res, next) => {
    try {
        const user = await UserServices.getUser(req.user?.id);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
export const updateUser = async (req, res, next) => {
    try {
        const { role, ...userData } = req.body;
        const user = await UserServices.updateUser({
            userId: req.user?.id,
            data: { ...userData, avatar: req.file?.path },
        });
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
