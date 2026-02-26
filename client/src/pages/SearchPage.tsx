import BreadCrumbs from '@/components/shared/BreadCrumbs';
import { ProductPageSkeleton } from '@/components/layout/skeleton/ProductPageSkeleton';
import { ProductCard } from '@/components/ProductCard';
import { PaginationBar } from '@/components/product-list/Pagination';
import { useProducts } from '@/features/product/hooks';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { Search, SearchX } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { Icon } from '@/components/shared/Icon';

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const keyword = (searchParams.get('q') ?? '').trim();
    const [page, setPage] = useState(1);
    const limit = 9;

    useEffect(() => {
        setPage(1);
    }, [keyword]);

    const query = useMemo(
        () => ({
            search: keyword || undefined,
            page,
            limit,
            sort: 'newest' as const,
        }),
        [keyword, page]
    );

    const { data, isFetching } = useQuery({
        ...useProducts(query),
        enabled: keyword.length > 0,
    });

    if (isFetching) return <ProductPageSkeleton />;

    return (
        <div className="px-6 md:px-10 py-6">
            <BreadCrumbs />
            <div className="mt-6 max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                    Search Results
                </h1>
                <p className="text-secondary mt-2">
                    {keyword
                        ? `Showing results for "${keyword}"`
                        : 'Use the search input in the navbar to find products.'}
                </p>

                {!keyword ? (
                    <div className="mt-8 rounded-xl border border-dashed border-light-border dark:border-dark-border p-8 text-center">
                        <Icon icon={Search} className="mx-auto mb-3 text-secondary" />
                        <p className="text-secondary">Enter a keyword to start searching.</p>
                    </div>
                ) : data?.product.length ? (
                    <>
                        <div className="grid gap-5 mt-8 md:grid-cols-2 lg:grid-cols-3">
                            {data.product.map(product => (
                                <ProductCard key={product._id} {...product} />
                            ))}
                        </div>
                        <div className="mt-8">
                            <PaginationBar
                                currentPage={page}
                                totalPages={data.pages || 1}
                                onPageChange={setPage}
                            />
                        </div>
                    </>
                ) : (
                    <div className="mt-8 rounded-xl border border-dashed border-light-border dark:border-dark-border p-8 text-center">
                        <Icon icon={SearchX} className="mx-auto mb-3 text-secondary" />
                        <p className="text-secondary">
                            No products match "{keyword}". Try a different keyword.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
