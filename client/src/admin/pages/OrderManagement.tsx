import { ReusableTable } from '@/components/shared/dashboard/ReusableTable';
import { Icon } from '@/components/shared/Icon';
import type { Order } from '@/schema/order.schema';
import { useAuthStore } from '@/store/AuthStore';
import { priceFormat, resolveStatus } from '@/utils/format';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Eye, Trash2 } from 'lucide-react';
import type { Variants } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useOrders } from '../features/orders/hooks';
import { useFilterStore, type FilterKey } from '@/store/FilterStore';
import {
    ActiveFilterChips,
    FilterPanel,
    type ActiveFilter,
} from '@/admin/components/orders/OrderFilters';
import { SelectedOrdersBar } from '@/admin/components/orders/OrderSelectionBar';
import { Checkbox } from '../components/shared/Checkbox';
import { useTableSelectionStore } from '../store/TableStore';
import { ConfirmationModal, UpdateStatusModal } from '../components/orders/ActionModal';

export const OrderManagement = () => {
    const identity = useAuthStore(s => s.identity);
    const {
        from,
        to,
        search,
        status,
        minTotal,
        maxTotal,
        paymentProvider,
        page,
        limit,
        setFilter,
        resetFilters,
    } = useFilterStore();
    const [searchInput, setSearchInput] = useState(search);
    const filter = useMemo(
        () => ({ from, to, search, status, minTotal, maxTotal, paymentProvider, page, limit }),
        [from, to, search, status, minTotal, maxTotal, paymentProvider, page, limit]
    );
    const { data, isLoading } = useQuery(useOrders(filter));

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchInput !== search) {
                setFilter('search', searchInput);
            }
        }, 400);

        return () => clearTimeout(handler);
    }, [search, searchInput, setFilter]);

    useEffect(() => {
        setSearchInput(search);
    }, [search]);

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState<"deleteOne" | "deleteMany" | "updateStatus" | null>(null);

    const { selectedIds, clear } = useTableSelectionStore();

    const selectedRows = Array.from(selectedIds);

    const pagination = useMemo(() => {
        return {
            pageIndex: Math.max(0, page - 1),
            pageSize: limit,
        };
    }, [page, limit]);

    const activeFilters = useMemo<ActiveFilter[]>(() => {
        const items: { key: FilterKey; label: string; onClear: () => void }[] = [];

        if (search) {
            items.push({
                key: 'search',
                label: `Search: ${search}`,
                onClear: () => setFilter('search', ''),
            });
        }
        if (status && status !== 'ALL') {
            items.push({
                key: 'status',
                label: `Status: ${status.replaceAll('_', ' ')}`,
                onClear: () => setFilter('status', 'ALL'),
            });
        }
        if (from) {
            items.push({
                key: 'from',
                label: `From: ${from}`,
                onClear: () => setFilter('from', ''),
            });
        }
        if (to) {
            items.push({
                key: 'to',
                label: `To: ${to}`,
                onClear: () => setFilter('to', ''),
            });
        }
        if (minTotal) {
            items.push({
                key: 'minTotal',
                label: `Min: ${minTotal}`,
                onClear: () => setFilter('minTotal', ''),
            });
        }
        if (maxTotal) {
            items.push({
                key: 'maxTotal',
                label: `Max: ${maxTotal}`,
                onClear: () => setFilter('maxTotal', ''),
            });
        }
        if (paymentProvider && paymentProvider !== 'ALL') {
            items.push({
                key: 'paymentProvider',
                label: `Payment: ${paymentProvider}`,
                onClear: () => setFilter('paymentProvider', 'ALL'),
            });
        }

        return items;
    }, [from, maxTotal, minTotal, paymentProvider, search, setFilter, status, to]);

    const columns: ColumnDef<Order>[] = useMemo(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllRowsSelected()}
                        indeterminate={table.getIsSomeRowsSelected()}
                        ariaLabel="Select all orders"
                        onChange={table.getToggleAllRowsSelectedHandler()}
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        ariaLabel={`Select order ${row.original._id ?? ''}`}
                        onChange={row.getToggleSelectedHandler()}
                    />
                ),
            },
            {
                header: 'Order Id',
                cell: ({ row }) => (
                    <div className="text-sm">
                        <h4 className='text-black dark:text-white'>{row.original.orderNumber}</h4>
                        <p className='text-secondary'>{row.original.shippingAddress.fullName}</p>
                    </div>
                ),
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
                        <span className={`${status.className} rounded-xl py-1 px-4 text-xs`}>
                            {status.label}
                        </span>
                    );
                },
            },
            {
                header: 'Action',
                cell: ({ row }) => {
                    const handleNavigate = () => {
                        navigate(`${row.original._id}`);
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
        ],
        [navigate]
    );

    if (identity.type !== 'user') return null;    

    const buttonVariants: Variants = {
        hover: {
            backgroundColor: 'var(--color-white)',
            color: 'var(--color-primary)',
        },
        tap: {
            scale: 0.9,
        },
    };    

    return (
        <div className="bg-light-fg dark:bg-dark-bg p-10">
            {showModal === "updateStatus" && <UpdateStatusModal selectedRows={selectedRows} closeModal={() => setShowModal(null)}  /> }
            {showModal === "deleteMany" && <ConfirmationModal selectedRows={selectedRows} closeModal={() => setShowModal(null)}  /> }
            <div>
                <FilterPanel
                    searchInput={searchInput}
                    status={status}
                    from={from}
                    to={to}
                    minTotal={minTotal}
                    maxTotal={maxTotal}
                    paymentProvider={paymentProvider}
                    onSearchChange={setSearchInput}
                    onFilterChange={setFilter}
                    onReset={resetFilters}
                />
                <ActiveFilterChips filters={activeFilters} />
                <SelectedOrdersBar
                    showModal={(type: "updateStatus" | "deleteMany") => setShowModal(type)}
                    selectedCount={selectedRows.length}
                    onClear={clear}
                    variants={buttonVariants}
                />
                <ReusableTable
                    columns={columns}
                    data={data?.order ?? []}
                    pageCount={Math.ceil(((data?.total ?? 0) as number) / limit) ?? 1}
                    pagination={pagination}
                    isLoading={isLoading}
                    onPaginationChange={updater => {
                        const next =
                            typeof updater === 'function'
                                ? updater({
                                      pageIndex: pagination.pageIndex,
                                      pageSize: pagination.pageSize,
                                  })
                                : updater;

                        if (next.pageSize !== limit) {
                            setFilter('limit', next.pageSize);
                        }
                        if (next.pageIndex !== pagination.pageIndex) {
                            setFilter('page', next.pageIndex + 1);
                        }
                    }}
                />
            </div>
        </div>
    );
};
