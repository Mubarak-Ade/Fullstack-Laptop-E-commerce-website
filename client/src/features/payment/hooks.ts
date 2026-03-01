import { mutationOptions, useQueryClient } from '@tanstack/react-query';
import { confirmFakePayment, initialize } from './api';
import { useAuthStore } from '@/store/AuthStore';

export const useInitPayment = () => {
    const queryClient = useQueryClient();
    return mutationOptions({
        mutationFn: initialize,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['user-orders'] });
        },
    });
};

export const useConfirmFakePayment = () => {
    const queryClient = useQueryClient();
    const identity = useAuthStore(s => s.identity);
    return mutationOptions({
        mutationFn: confirmFakePayment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['user-orders'] });
            queryClient.invalidateQueries({ queryKey: ['cart', identity.type] });
        },
    });
};
