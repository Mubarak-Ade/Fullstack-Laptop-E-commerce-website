import { mutationOptions, queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { addItemToCart, deleteCartItem, getUserCart, modifyCartQuantity } from './api';
import type { Cart } from '@/schema/cart.schema';
import { useAuthStore } from '@/store/AuthStore';

const cartQueryKey = (identityType: string) => ['cart', identityType] as const

export const useCart = () => {
    const identity = useAuthStore(s => s.identity);
    return queryOptions<Cart>({
        queryKey: cartQueryKey(identity.type),
        queryFn: getUserCart,
        enabled: !!identity,
    });
};

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    const identity = useAuthStore(s => s.identity);
    return mutationOptions({
        mutationFn: addItemToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cartQueryKey(identity.type) });
        },
    })
};

export const useCartQuantity = () => {
    const queryClient = useQueryClient();
    const identity = useAuthStore(s => s.identity);
    return mutationOptions({
        mutationFn: modifyCartQuantity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cartQueryKey(identity.type) });
        },
    });
};

export const useDeleteCartItem = () => {
    const queryClient = useQueryClient();
    const identity = useAuthStore(s => s.identity);
    return mutationOptions({
        mutationFn: deleteCartItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cartQueryKey(identity.type) });
        },
    });
};
