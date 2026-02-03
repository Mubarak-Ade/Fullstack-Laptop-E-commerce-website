import { useAuthStore } from '@/store/AuthStore';
import { mutationOptions } from '@tanstack/react-query';
import { login } from './api';

export const useLogin = () => {
    const setUser = useAuthStore(s => s.setUser);
    return mutationOptions({
        mutationFn: login,
        onSuccess: data => {
            setUser(data);
        },
    });
};
