import createHttpError from 'http-errors';
import User from '../models/User.js';
import { UserDTO } from '../schema/user.schema.js';

class UserServices {
    static async regiserUser(data: UserDTO) {
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

        const token = user.getJWTToken();

        return {
            id: user._id,
            email: user.email,
            token,
        };
    }

    static async loginUser(data: UserDTO) {
        const { email, password } = data;
        if (!email || !password) {
            throw createHttpError(400, 'fields missing');
        }
        const user = await User.findOne({ email: email });

        if (!user) {
            throw createHttpError(400, 'Email doesnt exist');
        }

        const isMatch = user.comparePassword(password);

        if (!isMatch) {
            throw createHttpError(400, 'Password does not match');
        }

        const token = user.getJWTToken();

        return {
            id: user._id,
            email: user.email,
            token,
        };
    }
}

export default UserServices;
