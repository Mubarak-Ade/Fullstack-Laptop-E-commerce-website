import { mutationOptions, queryOptions, useQueryClient } from "@tanstack/react-query";
import { createOrder, getOrder, getOrders } from "./api";

export const useOrders = () => {
    return queryOptions({
        queryKey: ['orders'],
        queryFn: getOrders
    })
}

export const useOrder = (id: string) => {
    return queryOptions({
        queryKey: ['orders', id],
        queryFn: () => getOrder(id)
    })
}

export const useCreateOrder = () => {
    const queryClient = useQueryClient()
    return mutationOptions({
        mutationFn: createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: useOrders().queryKey})
        }
    })
}