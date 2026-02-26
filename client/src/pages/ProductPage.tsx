import { FilterSideBar } from '@/components/layout/FilterSideBar';
import { ProductPageSkeleton } from '@/components/layout/skeleton/ProductPageSkeleton';
import { PaginationBar } from "@/components/product-list/Pagination";
import { ProductCard } from '@/components/ProductCard';
import BreadCrumbs from '@/components/shared/BreadCrumbs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useProducts } from '@/features/product/hooks';
import type { ProductFilters } from '@/schema/product.schema';
import { useFilterProductStore } from '@/store/FilterProductStore';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const ProductPage = () => {
    type ProductSort = NonNullable<ProductFilters['sort']>;
    const filter = useFilterProductStore(s => s.filter);
    const pagination = useFilterProductStore(s => s.pagination);
    const buildQuery = useFilterProductStore(s => s.buildQuery);

    const currentPage = pagination.page
    const setPage = useFilterProductStore(s => s.setPage);
    const setSort = useFilterProductStore(s => s.setSort);
    const query = useMemo(() => buildQuery(), [buildQuery, filter, pagination]);
    const { data, isFetching } = useQuery(useProducts(query));

    if (isFetching) {
        return <ProductPageSkeleton />;
    }

    return (
        <div>
            <BreadCrumbs />
            <div className="p-10 flex gap-10 max-w-7xl w-full">
                <FilterSideBar />
                <div className="">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl dark:text-white font-bold mb-5">All Products</h1>
                        <div className="flex justify-center items-center gap-4 mb-5">
                            <h4 className="text-black dark:text-white">Sort By</h4>
                            <Select
                                value={filter.sort}
                                onValueChange={value =>
                                    setSort(value as ProductSort)
                                }
                            >
                                <SelectTrigger className="py-3 rounded-xl border border-primary bg-light-bg dark:bg-dark-bg text-black dark:text-white mt-4 w-full">
                                    <SelectValue placeholder="Select Sort Type" />
                                </SelectTrigger>
                                <SelectContent className="bg-light-bg cursor-pointer dark:bg-dark-bg border border-primary rounded-xl shadow-lg text-white shadow-light-fg dark:shadow-dark-bg">
                                    <SelectItem value="newest">Newest First</SelectItem>
                                    <SelectItem value="discount">Biggest Discount</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid gap-5 grid-cols-3">
                        {data?.product.map(product => (
                            <ProductCard {...product} key={product._id} />
                        ))}
                    </div>
                    <div className="mt-5">
                        <PaginationBar
                            currentPage={currentPage}
                            totalPages={data?.pages || 1}
                            onPageChange={setPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
