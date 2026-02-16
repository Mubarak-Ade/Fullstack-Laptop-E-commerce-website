import type { Order, ShippingInput } from '@/schema/order.schema';
import api from '@/utils/axios';

export const createOrder = async (payload: ShippingInput) => {
    const res = await api.post('/order', payload);
    return res.data;
};

export const getMyOrders = async (): Promise<Order[]> => {
    const res = await api.get('/order');
    return res.data;
};

export const getOrders = async (): Promise<Order[]> => {
    const res = await api.get('/admin/orders');
    return res.data;
};

export const getOrder = async (id: string): Promise<Order> => {
    const res = await api.get(`/order/${id}`);
    return res.data;
};
