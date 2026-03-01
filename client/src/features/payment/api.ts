import api from "@/utils/axios";

export const initialize = async ({
    orderId,
    paymentMethod,
}: {
    orderId: string;
    paymentMethod: string;
}) => {
    const res = await api.post('payment/initialize', { orderId, paymentMethod });
    return res.data
}

export const confirmFakePayment = async (reference: string)  => {
    const res = await api.post('payment/fake/confirm', {reference})
    return res.data
}
