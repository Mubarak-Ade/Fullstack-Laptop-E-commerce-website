import { OrderSummary } from '@/components/Order/OrderSummary';
import BreadCrumbs from '@/components/shared/BreadCrumbs';
import { Icon } from '@/components/shared/Icon';
import { resolveStatus } from '@/utils/format';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CheckCircle2, MapPin, Settings2 } from 'lucide-react';
import { useParams } from 'react-router';
import { useOrderDetail, useUpdateOrderStatus } from '../features/orders/hooks';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { status as orderStatuses } from '@/utils/constants';

export const OrderDetailPage = () => {
    const { id } = useParams();
    const { data: order, isLoading, isError } = useQuery({
        ...useOrderDetail(id as string),
        enabled: !!id,
    });
    const updateStatus = useMutation(useUpdateOrderStatus());

    const { showToast } = useToast();

    const paymentStatus = orderStatuses;

    const [selectedStatus, setSelectedStatus] = useState<(typeof paymentStatus)[number] | null>(
        null
    );

    useEffect(() => {
        setSelectedStatus(order?.status ?? null);
    }, [order?.status]);

    const handleStatusUpdate = () => {
        if (!id || !selectedStatus) return;

        updateStatus.mutate(
            { id, status: selectedStatus },
            {
                onSuccess: () => {
                    showToast('success', 'Order status updated successfully');
                },
                onError: error => {
                    showToast('error', error.message || 'Failed to update order status');
                },
            }
        );
    };

    if (isLoading) {
        return <div className="p-4">Loading order...</div>;
    }

    if (isError) {
        return <div className="p-4">Failed to load order details.</div>;
    }

    if (!order) {
        return <div className="p-4">Order not found</div>;
    }

    const status = resolveStatus(order.status);
    const isUpdateDisabled =
        !selectedStatus || selectedStatus === order.status || updateStatus.isPending;

    return (
        <div>
            <BreadCrumbs />
            <div className="p-10">
                <h1 className="text-black flex dark:text-white text-3xl font-extrabold font-technical items-center gap-2">
                    Order {order.orderNumber}
                    <span
                        className={`text-sm font-display font-bold rounded-full ${status.className} px-4 py-1`}
                    >
                        {status.label}
                    </span>
                </h1>

                <p className="mt-2 text-secondary text-lg">
                    Placed on {format(order.createdAt, 'PPpp')}
                </p>

                <div className="flex  gap-10 items-center">
                    <div className="mt-5 max-w-xl w-full">
                        <OrderSummary
                            products={order.products}
                            shippingFee={order.shippingFee}
                            subTotal={order.subTotal}
                            tax={order.tax}
                            total={order.total}
                        />
                    </div>

                    <div className="w-1/3 space-y-4">
                        <div className="bg-light-fg dark:bg-dark-fg p-5 border-2 border-light-border dark:border-dark-border rounded-xl shadow-lg shadow-light-fg dark:shadow-dark-bg w-full">
                            <h2 className="text-primary flex gap-2 items-center  font-bold">
                                <Icon icon={Settings2} /> Update Status
                            </h2>
                            <Select
                                value={selectedStatus ?? ''}
                                onValueChange={e =>
                                    setSelectedStatus(e as (typeof paymentStatus)[number])
                                }
                            >
                                <SelectTrigger className="py-3 rounded-xl border border-primary bg-light-bg dark:bg-dark-bg text-black dark:text-white mt-4 w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent className="bg-light-bg cursor-pointer dark:bg-dark-bg border border-primary rounded-xl shadow-lg text-white shadow-light-fg dark:shadow-dark-bg">
                                    {paymentStatus.map(orderStatus => (
                                        <SelectItem key={orderStatus} value={orderStatus}>
                                            {resolveStatus(orderStatus).label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <button
                                onClick={handleStatusUpdate}
                                disabled={isUpdateDisabled}
                                className="bg-primary text-white py-2 rounded-xl w-full mt-4 flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Icon icon={CheckCircle2} />
                                {updateStatus.isPending ? 'Updating...' : 'Update Status'}
                            </button>
                        </div>
                        <div className="">
                            <div className="bg-light-bg dark:bg-dark-surface p-5 rounded-xl shadow-lg shadow-light-fg dark:shadow-dark-bg w-full">
                                <h4 className="flex gap-2 font-bold items-center text-black dark:text-white">
                                    <Icon icon={MapPin} className="text-primary" /> Shipping Address
                                </h4>
                                <div className="text-secondary mt-5 space-y-1">
                                    <h4 className="font-bold text-black dark:text-white">
                                        {order.shippingAddress.fullName}
                                    </h4>
                                    <p>{order.shippingAddress.address}</p>
                                    <p>
                                        {order.shippingAddress.state} {order.shippingAddress.city}
                                    </p>
                                    <p>{order.shippingAddress.country}</p>
                                    <p>{order.shippingAddress.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
