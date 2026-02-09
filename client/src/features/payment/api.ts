import api from "@/utils/axios";

export const initializeFakePayment = async (orderId: string)  => {
    const res = await api.post('payment/fake/initialize', {orderId})
    return res.data
}

export const confirmFakePayment = async (reference: string)  => {
    const res = await api.post('payment/fake/confirm', {reference})
    return res.data
}
