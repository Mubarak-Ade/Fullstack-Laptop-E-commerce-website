import type { OrderInput } from "@/schema/order.schema";
import api from "@/utils/axios";

export const createOrder = async (payload: OrderInput) => {
    const res = await api.post('/order', payload)
    return res.data
}

export const getOrders = async () => {
    const res = await api.get('/order')
    return res.data
}

export const getOrder = async (id: string) => {
    const res = await api.get(`/order/${id}`)
    return res.data
}