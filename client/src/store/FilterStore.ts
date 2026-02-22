import { status } from '@/utils/constants';
import { create } from 'zustand';

type STATUS = (typeof status)[number];
type StatusFilter = STATUS | 'ALL';
type PaymentFilter = 'FAKE' | 'PAYSTACK' | 'ALL';
export type FilterKey =
    | 'page'
    | 'limit'
    | 'status'
    | 'from'
    | 'to'
    | 'search'
    | 'minTotal'
    | 'maxTotal'
    | 'paymentProvider';

interface FilterState {
    page: number;
    limit: number;
    status: StatusFilter;
    from: string;
    to: string;
    search: string;
    minTotal: string;
    maxTotal: string;
    paymentProvider: PaymentFilter;
    setFilter: (key: FilterKey, value: string | number | StatusFilter | PaymentFilter) => void;
    resetFilters: () => void;
}

export const useFilterStore = create<FilterState>(set => ({
    from: '',
    to: '',
    limit: 10,
    page: 1,
    status: 'ALL',
    search: '',
    minTotal: '',
    maxTotal: '',
    paymentProvider: 'ALL',
    setFilter: (key, value) =>
        set(state => ({
            ...state,
            [key]: value,
            page: key === 'page' ? Number(value) || 1 : 1,
        })),
    resetFilters: () =>
        set(state => ({
            ...state,
            from: '',
            to: '',
            page: 1,
            status: 'ALL',
            search: '',
            minTotal: '',
            maxTotal: '',
            paymentProvider: 'ALL',
        })),
}));
