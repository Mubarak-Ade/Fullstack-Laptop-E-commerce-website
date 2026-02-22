import type { Order } from '@/schema/order.schema';

export const priceFormat = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format(price);
};

export const resolveStatus = (status: Order['status']) => {
    switch (status) {
        case 'PENDING_PAYMENT':
            return { label: 'Pending Payment', className: 'bg-amber-500/20 text-amber-600 border' };
        case 'PAID':
            return { label: 'Paid', className: 'bg-blue-500/20 text-blue-600 border' };
        case 'PROCESSING':
            return { label: 'Processing', className: 'bg-indigo-500/20 text-indigo-600 border' };
        case 'SHIPPED':
            return { label: 'Shipped', className: 'bg-cyan-500/20 text-cyan-600 border' };
        case 'DELIVERED':
            return { label: 'Delivered', className: 'bg-green-500/20 text-green-600 border' };
        case 'CANCELLED':
            return { label: 'Cancelled', className: 'bg-red-500/20 text-red-600 border' };
        default:
            return { label: 'Unknown', className: 'bg-gray-500/20 text-gray-600 border' };
    }
};
