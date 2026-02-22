import { mutationOptions, useQueryClient } from "@tanstack/react-query";
import { confirmFakePayment, initializeFakePayment } from "./api";

export const useInitFakePayment = () => {
    const queryClient = useQueryClient()
    return mutationOptions({
        mutationFn: initializeFakePayment,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['orders']})
            queryClient.invalidateQueries({queryKey: ['user-orders']})
        }
    })
}

export const useConfirmFakePayment = () => {
    const queryClient = useQueryClient()
    return mutationOptions({
        mutationFn: confirmFakePayment,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['orders']})
            queryClient.invalidateQueries({queryKey: ['user-orders']})
        }
    })
}
