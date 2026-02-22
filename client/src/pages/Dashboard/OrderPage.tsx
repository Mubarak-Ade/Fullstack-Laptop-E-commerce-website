import { ReusableTable } from '@/components/shared/dashboard/ReusableTable';
import { Icon } from '@/components/shared/Icon';
import { useMyOrders } from '@/features/order/hooks';
import type { Order } from '@/schema/order.schema';
import { useAuthStore } from '@/store/AuthStore';
import { priceFormat, resolveStatus } from '@/utils/format';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Eye, Trash2 } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';

export const OrderPage = () => {
    const identity = useAuthStore(s => s.identity);
    const { data, isLoading } = useQuery(useMyOrders());

    const navigate = useNavigate();

    if (isLoading || !data) {
        return <p>Loading...</p>;
    }

    if (identity.type !== 'user') return;

    const user = identity.user;

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

    return (
        <div className='bg-light-fg dark:bg-dark-bg p-10'>
            <div className="">
                <ReusableTable columns={columns} data={data.slice(0, 5)} />
            </div>
        </div>
    );
};
