import { NextFunction, Request, RequestHandler, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import env from '../env.js';

interface JWTDecode {
    id: string,
    role: "user" | "admin"
}
export const attachUser = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer')) {
        return next()
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        throw createHttpError(401, "No token, unauthorize user")
    }

    try {
        const decode = jwt.verify(token, env.JWT_SECRET!) as JWTDecode;
        req.user = decode;
    } catch (error) {
    }
    next();
};
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user?.id

    if (!user) {
        throw createHttpError(401, 'Unauthorize user')
    }
    next()
}

export const authorizeRole = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user

    if ( !user || user.role !== "admin") {
        throw createHttpError(403, "Forbidden, Admin only")
    }
    console.log(user)
    next()
}
  