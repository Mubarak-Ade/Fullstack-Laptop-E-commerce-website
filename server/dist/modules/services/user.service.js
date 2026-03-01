import createHttpError from 'http-errors';
import User from '../../models/User.js';
import jwt from 'jsonwebtoken';
import env from '../../env.js';
import { createAccessToken, createRefreshToken } from '../../utils/tokenGenerator.js';
class UserServices {
    static async regiserUser(data) {
        const { email, password } = data;
        if (!email || !password) {
            throw createHttpError(400, 'fields missing');
        }
        let user = await User.findOne({ email: email });
        if (user) {
            throw createHttpError(400, 'Email already exist');
        }
        user = new User({
            email,
            password,
        });
        await user.save();
        const token = createAccessToken(user._id.toString(), user.role);
        return {
            id: user._id,
            email: user.email,
            token,
            role: user.role,
            fullname: user.firstName + " " + user.lastName
        };
    }
    static async loginUser(data) {
        const { email, password } = data;
        if (!email || !password) {
            throw createHttpError(400, 'fields missing');
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            throw createHttpError(400, 'Email doesnt exist');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw createHttpError(400, 'Password does not match');
        }
        const token = createAccessToken(user._id.toString(), user.role);
        const refreshToken = createRefreshToken(user._id.toString(), user.role);
        return {
            id: user._id,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            token,
            refreshToken,
            fullname: user.firstName + ' ' + user.lastName,
        };
    }
    static async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw createHttpError(401, 'No refresh token provided');
        }
        const payload = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);
        const accessToken = createAccessToken(payload.id, payload.role);
        return accessToken;
    }
    static async getUser(userId) {
        if (!userId) {
            throw createHttpError(401, 'user not authorize');
        }
        const user = await User.findById(userId).select('-password');
        return user;
    }
    static async updateUser({ userId, data }) {
        const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });
        if (!user) {
            throw createHttpError(404, "User Not Found");
        }
        return user;
    }
}
export default UserServices;
