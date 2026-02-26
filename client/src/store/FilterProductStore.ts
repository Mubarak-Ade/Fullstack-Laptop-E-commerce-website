import { create } from 'zustand';
import type { ProductFilters } from '@/schema/product.schema';

type FilterArrayKeys = 'brands' | 'ram' | 'storage' | 'cpu';
type FilterPriceKeys = 'min' | 'max';
type ProductSort = 'newest' | 'price-low' | 'price-high' | 'discount';

interface FilterProductState {
    filter: {
        brands: string[];
        ram: string[];
        storage: string[];
        cpu: string[];
        min?: number;
        max?: number;
        sort: ProductSort;
    };

    pagination: {
        page: number;
        limit: number;
    };

    toggleFilter: (key: FilterArrayKeys, value: string) => void;

    setPrice: (key: FilterPriceKeys, value: number) => void;
    setSort: (sort: ProductSort) => void;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;

    buildQuery: () => ProductFilters;
}

export const useFilterProductStore = create<FilterProductState>((set, get) => ({
    filter: {
        brands: [],
        ram: [],
        storage: [],
        cpu: [],
        sort: 'newest',
    },
    pagination: {
        page: 1,
        limit: 5,
    },
    toggleFilter: (key, value) =>
        set((state) => {
            const current = state.filter[key] as string[];
            return {
                filter: {
                    ...state.filter,
                    [key]: current.includes(value)
                        ? current.filter((item) => item !== value)
                        : [...current, value],
                },
                pagination: {
                    ...state.pagination,
                    page: 1,
                },
            };
        }),
    setPrice: (key, value) =>
        set((state) => ({
            filter: {
                ...state.filter,
                [key]: value,
            },
            pagination: {
                ...state.pagination,
                page: 1,
            },
        })),
    setSort: (sort) =>
        set((state) => ({
            filter: {
                ...state.filter,
                sort,
            },
            pagination: {
                ...state.pagination,
                page: 1,
            },
        })),
    setPage: (page) =>
        set((state) => ({
            pagination: {
                ...state.pagination,
                page,
            },
        })),
    setLimit: (limit) =>
        set((state) => ({
            pagination: {
                ...state.pagination,
                limit,
                page: 1,
            },
        })),
    buildQuery: () => {
        const { filter, pagination } = get();
        const query: ProductFilters = {
            page: pagination.page,
            limit: pagination.limit,
        };

        if (filter.brands.length) query.brands = filter.brands;
        if (filter.cpu.length) query.cpu = filter.cpu;
        if (filter.ram.length) query.ram = filter.ram;
        if (filter.storage.length) query.storage = filter.storage;
        if (typeof filter.min === 'number') query.min = filter.min;
        if (typeof filter.max === 'number') query.max = filter.max;
        if (filter.sort !== 'newest') query.sort = filter.sort;

        return query;
    },
}));
