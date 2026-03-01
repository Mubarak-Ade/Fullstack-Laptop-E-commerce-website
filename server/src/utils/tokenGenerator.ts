import jwt from "jsonwebtoken";
import env from "../env.js";

export const createAccessToken = (userId: string, role: string): string =>   {
    return jwt.sign({ id: userId, role }, env.JWT_SECRET, { expiresIn: '15m' });
}

export const createRefreshToken = (userId: string, role: string): string =>  {
    return jwt.sign({ id: userId, role }, env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}