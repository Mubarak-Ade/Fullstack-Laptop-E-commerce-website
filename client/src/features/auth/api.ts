import type { AuthInput, Profile, User } from '@/schema/user.schema';
import api from '@/utils/axios';

export const login = async (data: AuthInput): Promise<User> => {
    const res = await api.post('/user/login', { ...data });
    return res.data;
};

export const register = async (data: AuthInput): Promise<User> => {
    const res = await api.post('/user/register', { ...data });
    return res.data;
};

export const userProfile = async (): Promise<Profile> => {
    const res = await api.get('/user/me');
    return res.data;
};

export const editProfile = async (data: FormData) => {
    const res = await api.patch('/user/me', data);
    return res.data;
};
