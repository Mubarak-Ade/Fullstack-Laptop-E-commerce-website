import { mutationOptions, queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { addItemToCart, deleteCartItem, getUserCart, modifyCartQuantity } from './api';
import type { Cart } from '@/schema/cart.schema';

export const useCart = () =>
    queryOptions<Cart>({
        queryKey: ['cart'],
        queryFn: getUserCart,
    });

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
}