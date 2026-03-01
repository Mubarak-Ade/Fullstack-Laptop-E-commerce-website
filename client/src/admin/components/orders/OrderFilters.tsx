import { Icon } from '@/components/shared/Icon';
import type { FilterKey } from '@/store/FilterOrderStore';
import { X } from 'lucide-react';

export type ActiveFilter = {
    key: FilterKey;
    label: string;
    onClear: () => void;
};

type FilterPanelProps = {
    searchInput: string;
    status: string;
    from: string;
    to: string;
    minTotal: string;
    maxTotal: string;
    paymentProvider: string;
    onSearchChange: (value: string) => void;
    onFilterChange: (key: FilterKey, value: string | number) => void;
    onReset: () => void;
};

const statusOptions = [
    { value: 'ALL', label: 'All Statuses' },
    { value: 'PENDING_PAYMENT', label: 'PENDING PAYMENT' },
    { value: 'PAID', label: 'PAID' },
    { value: 'PROCESSING', label: 'PROCESSING' },
    { value: 'SHIPPED', label: 'SHIPPED' },
    { value: 'DELIVERED', label: 'DELIVERED' },
    { value: 'CANCELLED', label: 'CANCELLED' },
] as const;

const paymentOptions = [
    { value: 'ALL', label: 'All Providers' },
    { value: 'FAKE', label: 'FAKE' },
    { value: 'PAYSTACK', label: 'PAYSTACK' },
] as const;

export const FilterPanel = ({
    searchInput,
    status,
    from,
    to,
    minTotal,
    maxTotal,
    paymentProvider,
    onSearchChange,
    onFilterChange,
    onReset,
}: FilterPanelProps) => (
    <div className="mb-6 flex flex-wrap items-end gap-4 rounded-xl border border-light-border dark:border-dark-border bg-card px-5 py-4 shadow-lg">
        <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide text-secondary">
                Search Order / Email / Ref
            </label>
            <input
                value={searchInput}
                onChange={event => onSearchChange(event.target.value)}
                placeholder="e.g. ORD..."
                className="h-10 rounded-xl border border-light-border dark:border-dark-border bg-light-fg dark:bg-dark-fg px-3 text-sm text-coral-black dark:text-white outline-none focus:border-primary"
            />
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide text-secondary">Status</label>
            <select
                value={status}
                onChange={event => onFilterChange('status', event.target.value)}
                className="h-10 rounded-xl border border-light-border dark:border-dark-border bg-light-fg dark:bg-dark-fg px-3 text-sm text-coral-black dark:text-white outline-none focus:border-primary"
            >
                {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide text-secondary">From</label>
            <input
                type="date"
                value={from}
                onChange={event => onFilterChange('from', event.target.value)}
                className="h-10 rounded-xl border border-light-border dark:border-dark-border bg-light-fg dark:bg-dark-fg px-3 text-sm text-coral-black dark:text-white outline-none focus:border-primary"
            />
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide text-secondary">To</label>
            <input
                type="date"
                value={to}
                onChange={event => onFilterChange('to', event.target.value)}
                className="h-10 rounded-xl border border-light-border dark:border-dark-border bg-light-fg dark:bg-dark-fg px-3 text-sm text-coral-black dark:text-white outline-none focus:border-primary"
            />
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide text-secondary">Min Total</label>
            <input
                type="number"
                min={0}
                value={minTotal}
                onChange={event => onFilterChange('minTotal', event.target.value)}
                className="h-10 rounded-xl border border-light-border dark:border-dark-border  bg-light-fg dark:bg-dark-fg px-3 text-sm text-coral-black dark:text-white outline-none focus:border-primary"
            />
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide text-secondary">Max Total</label>
            <input
                type="number"
                min={0}
                value={maxTotal}
                onChange={event => onFilterChange('maxTotal', event.target.value)}
                className="h-10 rounded-xl border border-light-border dark:border-dark-border bg-light-fg dark:bg-dark-fg px-3 text-sm text-coral-black dark:text-white outline-none focus:border-primary"
            />
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide text-secondary">Payment</label>
            <select
                value={paymentProvider}
                onChange={event => onFilterChange('paymentProvider', event.target.value)}
                className="h-10 rounded-xl border border-light-border dark:border-dark-border bg-light-fg dark:bg-dark-fg px-3 text-sm text-coral-black dark:text-white outline-none focus:border-primary"
            >
                {paymentOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
        <button
            onClick={onReset}
            className="h-10 rounded-xl border border-light-border dark:border-dark-border px-4 text-sm font-semibold text-secondary transition-colors hover:border-primary hover:text-primary"
        >
            Clear Filters
        </button>
    </div>
);

export const ActiveFilterChips = ({ filters }: { filters: ActiveFilter[] }) => {
    if (filters.length === 0) return null;

    return (
        <div className="mb-5 flex flex-wrap gap-2">
            {filters.map(filter => (
                <button
                    key={filter.key}
                    onClick={filter.onClear}
                    className="flex items-center gap-2 rounded-full border border-light-border dark:border-dark-border bg-card px-3 py-1 text-xs font-semibold text-secondary transition-colors hover:border-primary hover:text-primary"
                >
                    {filter.label}
                    <Icon icon={X} />
                </button>
            ))}
        </div>
    );
};
