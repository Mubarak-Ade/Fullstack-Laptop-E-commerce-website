import { mutationOptions, queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { addItemToCart, deleteCartItem, getUserCart, modifyCartQuantity } from './api';
import type { Cart } from '@/schema/cart.schema';
import { useAuthStore } from '@/store/AuthStore';

export const useCart = () => {
    const identity = useAuthStore(s => s.identity);
    return queryOptions<Cart>({
        queryKey: ['cart', identity.type],
        queryFn: getUserCart,
        enabled: !!identity,
    });
};

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    return mutationOptions({
        mutationFn: addItemToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: useCart().queryKey });
        },
    });
};

export const useCartQuantity = () => {
    const queryClient = useQueryClient();
    return mutationOptions({
        mutationFn: modifyCartQuantity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: useCart().queryKey });
        },
    });
};

export const useDeleteCartItem = () => {
    const queryClient = useQueryClient();
    return mutationOptions({
        mutationFn: deleteCartItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: useCart().queryKey });
        },
    });
};
