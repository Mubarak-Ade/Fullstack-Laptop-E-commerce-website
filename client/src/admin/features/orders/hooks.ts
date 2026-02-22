import type { FilteredOrder, Order } from "@/schema/order.schema";
import { mutationOptions, queryOptions, useQueryClient } from "@tanstack/react-query";
import { deleteManyOrders, deleteOrder, getOrderById, getOrders, updateManyOrdersStatus, updateOrderStatus } from "./api";

export type OrdersFilterInput = {
    from?: string;
    to?: string;
    search?: string;
    status?: string;
    minTotal?: string;
    maxTotal?: string;
    paymentProvider?: string;
    page?: number;
    limit?: number;
};

const getOrdersQueryKey = (filter: OrdersFilterInput = {}) => ['orders', filter] as const;

export const useOrders = (filter: OrdersFilterInput = {}) => {
    return queryOptions<FilteredOrder>({
        queryKey: getOrdersQueryKey(filter),
        queryFn: () => getOrders(filter),
    });
};

export const useOrderDetail = (id: string) => {
    return queryOptions<Order>({
        queryKey: ['order', id],
        queryFn: () => getOrderById(id),
    });
};

export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();
    return mutationOptions({
        mutationFn: updateOrderStatus,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ['order', variables.id]});
            queryClient.invalidateQueries({queryKey: ['orders']});
        },
    });
};

export const useDeleteOrder = (id: string, filter: OrdersFilterInput = {}) => {
    const queryClient = useQueryClient();
    return mutationOptions({
        mutationFn: () => deleteOrder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['orders']});
            queryClient.invalidateQueries({queryKey: getOrdersQueryKey(filter)});
        },
    });
}

export const useDeleteManyOrders = () => {
    const queryClient = useQueryClient()
    return mutationOptions({
        mutationFn: deleteManyOrders,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['orders']});
            queryClient.invalidateQueries({queryKey: getOrdersQueryKey({})})
        }
    })
}

export const useUpdateManyOrderStatus = (filter: OrdersFilterInput = {}) => {
    const queryClient = useQueryClient()
    return mutationOptions({
        mutationFn: updateManyOrdersStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['orders']});
            queryClient.invalidateQueries({queryKey: getOrdersQueryKey(filter)})
        }
    })
}
