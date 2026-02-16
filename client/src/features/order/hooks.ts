import { mutationOptions, queryOptions, useQueryClient } from '@tanstack/react-query';
import { createOrder, getOrder, getMyOrders, getOrders } from './api';
import type { Order } from '@/schema/order.schema';

export const useMyOrders = () => {
    return queryOptions<Order[]>({
        queryKey: ['user-orders'],
        queryFn: getMyOrders,
    });
};

export const useOrders = () => {
    return queryOptions<Order[]>({
        queryKey: ['all-orders'],
        queryFn: getOrders,
    });
};

export const useOrder = (id: string) => {
    return queryOptions<Order>({
        queryKey: ['orders', id],
        queryFn: () => getOrder(id),
    });
};

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return mutationOptions({
        mutationFn: createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: useOrders().queryKey });
        },
    });
};
