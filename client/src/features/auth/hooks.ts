import { useAuthStore } from '@/store/AuthStore';
import { mutationOptions, queryOptions, useQueryClient } from '@tanstack/react-query';
import { editProfile, login, register, userProfile } from './api';
import type { Profile } from '@/schema/user.schema';

export const useLogin = () => {
    const setUser = useAuthStore(s => s.setUser);
    return mutationOptions({
        mutationFn: login,
        onSuccess: data => {
            setUser(data);
        },
    });
};

export const useRegister = () => {
    const setUser = useAuthStore(s => s.setUser);
    return mutationOptions({
        mutationFn: register,
        onSuccess: data => {
            setUser(data);
        },
    });
};

export const useUserProfile = () => {
    return queryOptions<Profile>({
        queryKey: ["user"],
        queryFn: userProfile
    })
}

export const useEditUser = () => {
    const queryClient = useQueryClient()
    return mutationOptions({
        mutationFn: editProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: useUserProfile().queryKey})
        }
    })
}
