import createHttpError from 'http-errors';
import User from '../models/User.js';
import { UserDTO } from '../schema/user.schema.js';
import CartService from './cart.service.js';

interface UserState {
    userId: string;
    // file: Express.Multer.File;

    data: UserDTO;
}
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
            role: user.role,
            fullname: user.firstName + " " + user.lastName
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
            avatar: user.avatar,
            role: user.role,
            token,
        };
    }
    static async getUser(userId: string) {
        if (!userId) {
            throw createHttpError(401, 'user not authorize');
        }
        const user = await User.findById(userId).select('-password');
        return user;
    }
    static async updateUser({ userId, data }: UserState) {
        const user = await User.findByIdAndUpdate(userId, data, {new: true, runValidators: true});

        if(!user) {
            throw createHttpError(404, "User Not Found")
        }

        return user

    }
}

export default UserServices;
