import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { ReusableTable } from '@/components/shared/dashboard/ReusableTable';
import { Icon } from '@/components/shared/Icon';
import { useOrders } from '@/features/order/hooks';
import type { Order } from '@/schema/order.schema';
import { useAuthStore } from '@/store/AuthStore';
import { priceFormat } from '@/utils/format';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { format, formatDistance } from 'date-fns';
import { Eye, ShoppingBag, Star, Trash2, Truck } from 'lucide-react';
import { useNavigate } from 'react-router';

const ShippingStatusCard = () => (
    <div className="w-full lg:w-[340px] bg-light-fg dark:bg-dark-fg border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-dark-text-primary dark:text-white">
            Current Shipping
        </h3>

        <div className="mt-5 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Truck size={22} />
            </div>
            <div className="text-sm">
                <p className="text-secondary uppercase tracking-wide">Tracking ID</p>
                <p className="font-semibold text-dark-text-primary dark:text-white">
                    SHN-99283-XLL
                </p>
            </div>
        </div>

        <div className="mt-6 space-y-5">
            <div className="flex gap-3">
                <div className="flex flex-col items-center">
                    <span className="size-3 rounded-full bg-primary ring-4 ring-primary/20" />
                    <span className="w-px flex-1 bg-light-border dark:bg-dark-border mt-1" />
                </div>
                <div className="-mt-0.5">
                    <p className="font-semibold text-dark-text-primary dark:text-white">
                        In Transit
                    </p>
                    <p className="text-sm text-secondary">Departed from Sorting Facility</p>
                    <p className="text-xs text-secondary">Today, 10:30 AM</p>
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex flex-col items-center">
                    <span className="size-3 rounded-full bg-light-border dark:bg-dark-border" />
                </div>
                <div className="-mt-0.5">
                    <p className="font-semibold text-dark-text-primary dark:text-white">
                        Out for Delivery
                    </p>
                    <p className="text-sm text-secondary">Estimated tomorrow</p>
                </div>
            </div>
        </div>

        <button className="mt-6 w-full rounded-xl bg-light-bg dark:bg-dark-surface text-dark-text-primary dark:text-white py-3 text-sm font-semibold">
            Track Order Details
        </button>
    </div>
);

export const Overview = () => {
    const identity = useAuthStore(s => s.identity);
    const { data, isLoading } = useQuery(useOrders());

    const navigate = useNavigate();

    if (isLoading || !data) {
        return <p>Loading...</p>;
    }

    if (identity.type !== 'user') return;

    const user = identity.user;

    const resolveStatus = (status: Order['status']) => {
        switch (status) {
            case 'PENDING_PAYMENT':
                return { label: 'Pending Payment', className: 'bg-amber-500/20 text-amber-600' };
            case 'PAID':
                return { label: 'Paid', className: 'bg-blue-500/20 text-blue-600' };
            case 'PROCESSING':
                return { label: 'Processing', className: 'bg-indigo-500/20 text-indigo-600' };
            case 'SHIPPED':
                return { label: 'Shipped', className: 'bg-purple-500/20 text-purple-600' };
            case 'DELIVERED':
                return { label: 'Delivered', className: 'bg-green-500/20 text-green-600' };
            default:
                return { label: 'Unknown', className: 'bg-gray-500/20 text-gray-600' };
        }
    };

    const columns: ColumnDef<Order>[] = [
        {
            header: 'Order Id',
            accessorFn: row => row._id || 'N/A',
        },
        {
            header: 'Date',
            accessorFn: row => format(row.updatedAt, 'PP'),
        },
        {
            header: 'Price',
            accessorFn: row => priceFormat(row.total),
        },
        {
            header: 'Status',
            cell: ({ row }) => {
                const status = resolveStatus(row.original.status);
                return (
                    <span className={`${status.className} rounded-xl py-1 px-6`}>
                        {status.label}
                    </span>
                );
            },
        },
        {
            header: 'Action',
            cell: ({ row }) => {
                const handleNavigate = () => {
                    navigate(`/order/${row.original._id}`);
                };

                return (
                    <div className="flex items-center justify-center gap-4">
                        <button onClick={handleNavigate}>
                            <Icon icon={Eye} />
                        </button>
                        <button>
                            <Icon icon={Trash2} />
                        </button>
                    </div>
                );
            },
        },
    ];

    const lastItem = data?.at(-1)?.updatedAt;
    console.log(lastItem);

    return (
        <div className="px-6 py-10">
            <div className="">
                <h1 className="text-3xl font-semibold font-technical dark:text-white text-black">
                    Welcome back, {user.fullname ? user.fullname : user.email}
                </h1>
                <h4 className="text-secondary mt-1">
                    Here's What's happening with your account today
                </h4>
            </div>

            <div className="p-5 flex gap-5">
                <DashboardCard
                    title="Total Orders"
                    icon={{
                        type: ShoppingBag,
                        className: 'bg-primary/10 rounded shadow p-2 text-primary',
                    }}
                    info={lastItem ? formatDistance(lastItem, Date.now()) : "N/A"}
                    value={data.length}
                />
                <DashboardCard
                    title="Total Orders"
                    icon={{
                        type: Star,
                        className:
                            'bg-amber-500/10 rounded shadow p-2 fill-amber-600 text-amber-600',
                    }}
                    info="Since January 2025"
                    value={data?.length}
                />
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="w-full flex-1 max-w-2xl">
                    <ReusableTable columns={columns} data={data.slice(0, 5)} />
                </div>
                <ShippingStatusCard />
            </div>
        </div>
    );
};
