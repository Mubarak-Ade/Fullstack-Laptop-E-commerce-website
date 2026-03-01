import { RequestHandler } from 'express';
import UserServices from '../services/user.service.js';
import createHttpError from 'http-errors';
import env from '../../env.js';

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
        res.cookie('jid', user.refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/api/user/refresh',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const { refreshToken, ...payload } = user;
        res.status(200).json(payload);
    } catch (error) {
        next(error);
    }
};

export const refreshToken: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const refreshToken = req.cookies?.jid as string | undefined;
        const token = await UserServices.refreshToken(refreshToken);
        res.status(200).json({ token });
    } catch (error) {
        next(createHttpError(401, 'Invalid refresh token'));
    }
};

export const logout: RequestHandler = async (req, res, next): Promise<void> => {
    res.clearCookie('jid', {
        path: '/api/user/refresh',
        secure: env.NODE_ENV === 'production',
        sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.json({ message: 'Logged out successfully' });
};

export const getUser: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const user = await UserServices.getUser(req.user?.id as string);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { role, ...userData } = req.body;
        const user = await UserServices.updateUser({
            userId: req.user?.id as string,
            data: { ...userData, avatar: req.file?.path },
        });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
