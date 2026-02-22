import { mutationOptions, queryOptions, useQueryClient } from '@tanstack/react-query';
import { createOrder, getOrder, getMyOrders } from './api';
import type { Order } from '@/schema/order.schema';

export const useMyOrders = () => {
    return queryOptions<Order[]>({
        queryKey: ['user-orders'],
        queryFn: getMyOrders,
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
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['user-orders'] });
        },
    });
};
