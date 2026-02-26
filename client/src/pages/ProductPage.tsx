import { FilterSideBar } from '@/components/layout/FilterSideBar';
import { ProductPageSkeleton } from '@/components/layout/skeleton/ProductPageSkeleton';
import { PaginationBar } from "@/components/product-list/Pagination";
import { ProductCard } from '@/components/ProductCard';
import BreadCrumbs from '@/components/shared/BreadCrumbs';
import { Icon } from '@/components/shared/Icon';
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
import { Filter } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

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

    const [showFilterBar, setShowFilterBar] = useState(false)

    if (isFetching) {
        return <ProductPageSkeleton />;
    }

    return (
        <div>
            <BreadCrumbs />
            <button onClick={() => setShowFilterBar(!showFilterBar)} className='px-5 py-3 m-5 flex gap-2 items-center text-white rounded-xl cursor-pointer lg:hidden bg-primary'>
                Filter Product <Icon icon={Filter} />
            </button>
            <div className="p-10 flex gap-10 max-w-7xl w-full">
                <FilterSideBar show={showFilterBar} close={() => setShowFilterBar(!showFilterBar)} />
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex lg:flex-row flex-col justify-between items-center">
                        <h1 className="text-2xl dark:text-white font-bold mb-5">All Products</h1>
                        <div className="flex justify-center items-center gap-4 mb-5">
                            <h4 className="text-black self-center dark:text-white w-full">Sort By</h4>
                            <Select
                                value={filter.sort}
                                onValueChange={value =>
                                    setSort(value as ProductSort)
                                }
                            >
                                <SelectTrigger className="py-3 rounded-xl border border-primary bg-light-bg dark:bg-dark-bg text-black dark:text-white  w-full">
                                    <SelectValue placeholder="Select Sort Type" />
                                </SelectTrigger>
                                <SelectContent className="bg-light-bg cursor-pointer dark:bg-dark-bg border border-primary rounded-xl shadow-lg text-black dark:text-white shadow-light-fg dark:shadow-dark-bg">
                                    <SelectItem value="newest">Newest First</SelectItem>
                                    <SelectItem value="discount">Biggest Discount</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid gap-5 place-items-center md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
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
