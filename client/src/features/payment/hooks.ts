import { mutationOptions, useQueryClient } from "@tanstack/react-query";
import { useOrders } from "../order/hooks";
import { confirmFakePayment, initializeFakePayment } from "./api";

export const useInitFakePayment = () => {
    const queryClient = useQueryClient()
    return mutationOptions({
        mutationFn: initializeFakePayment,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: useOrders().queryKey})
        }
    })
}

export const useConfirmFakePayment = () => {
    const queryClient = useQueryClient()
    return mutationOptions({
        mutationFn: confirmFakePayment,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: useOrders().queryKey})
        }
    })
}