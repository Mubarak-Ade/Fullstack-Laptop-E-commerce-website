import type { Filter, FilteredOrder, Order } from '@/schema/order.schema';
import api from '@/utils/axios';

export const getOrders = async (filter: Partial<Filter>): Promise<FilteredOrder> => {
    const params = new URLSearchParams();

    Object.entries(filter).forEach(([key, value]) => {
        if (
            value === undefined ||
            value === null ||
            value === '' ||
            value === 'ALL'
        ) {
            return;
        }
        params.append(key, String(value));
    });

    const res = await api.get('/admin/orders', { params });
    return res.data;
};

export const getOrderById = async (id: string) : Promise<Order> => {
    const res = await api.get(`/admin/orders/${id}`);
    return res.data;
};

export type UpdateOrderStatusPayload = {
    id: string;
    status: string;
};

export const updateOrderStatus = async ({ id, status }: UpdateOrderStatusPayload) => {
    const res = await api.patch(`/admin/orders/${id}`, { status });
    return res.data;
};

export const deleteOrder = async (id: string) => {
    const res = await api.delete(`/admin/orders/${id}`);
    return res.data;
};

export const deleteManyOrders = async (orderIds: string[]) => {
    const res = await api.delete('/admin/orders', { data: { orderIds } });
    return res.data;
};

export type UpdateManyOrdersStatusPayload = {
    orderIds: string[];
    status: string;
};

export const updateManyOrdersStatus = async ({ orderIds, status }: UpdateManyOrdersStatusPayload) => {
    const res = await api.patch('/admin/orders', { orderIds, status });
    return res.data;
}
