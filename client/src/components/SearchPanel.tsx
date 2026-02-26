import { useProducts } from '@/features/product/hooks';
import { useSearchStore } from '@/store/SearchStore';
import { priceFormat } from '@/utils/format';
import { useQuery } from '@tanstack/react-query';
import { Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Icon } from './shared/Icon';

export const SearchPanel = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { query, isOpen, close } = useSearchStore();
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query.trim());
        }, 250);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        close();
    }, [close, location.pathname]);

    const productQuery = useMemo(
        () => ({
            search: debouncedQuery || undefined,
            limit: 6,
            page: 1,
        }),
        [debouncedQuery]
    );

    const queryOptions = useProducts(productQuery);
    const { data, isFetching } = useQuery({
        ...queryOptions,
        enabled: isOpen && debouncedQuery.length > 0,
    });

    if (!isOpen || location.pathname === '/search') return null;

    return (
        <>
            <button
                type="button"
                aria-label="Close search panel"
                onClick={close}
                className="fixed inset-0 z-[95] bg-black/25 backdrop-blur-[1px]"
            />
            <div className="max-w-2xl w-[calc(100%-2rem)] bg-light-bg dark:bg-dark-fg fixed top-20 left-1/2 -translate-x-1/2 z-[100] p-5 rounded-xl shadow-[0_0_15px] shadow-black/20 border border-light-border dark:border-dark-border">
                <div className="flex items-center justify-between">
                    <h1 className="font-bold text-black dark:text-white">Product Results</h1>
                    <button
                        type="button"
                        aria-label="Close search"
                        onClick={close}
                        className="text-secondary hover:text-primary transition-colors"
                    >
                        <Icon icon={X} />
                    </button>
                </div>

                {!debouncedQuery ? (
                    <p className="text-secondary mt-4 text-sm">Type to search products.</p>
                ) : isFetching ? (
                    <p className="text-secondary mt-4 text-sm">Searching products...</p>
                ) : data?.product.length ? (
                    <div className="mt-4 space-y-2 max-h-96 overflow-auto">
                        {data.product.map(product => (
                            <Link
                                to={`/products/${product.slug}`}
                                key={product._id}
                                onClick={close}
                                className="flex items-center gap-3 rounded-xl border border-light-border dark:border-dark-border bg-light-fg dark:bg-dark-bg p-3 hover:border-primary transition-colors"
                            >
                                <img
                                    src={product.images[0]?.url}
                                    alt={product.name}
                                    className="size-12 object-cover rounded-lg border border-light-border dark:border-dark-border"
                                />
                                <div className="min-w-0">
                                    <h4 className="font-semibold text-black dark:text-white line-clamp-1">
                                        {product.name}
                                    </h4>
                                    <p className="text-xs text-secondary line-clamp-1">
                                        {product.brand}
                                    </p>
                                </div>
                                <span className="ml-auto text-sm font-semibold text-primary">
                                    {priceFormat(product.price)}
                                </span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="mt-5 rounded-xl border border-dashed border-light-border dark:border-dark-border p-5 text-center">
                        <Icon icon={Search} className="mx-auto mb-2 text-secondary" />
                        <p className="text-secondary text-sm">
                            No products found for "{debouncedQuery}".
                        </p>
                    </div>
                )}

                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={() => {
                            const keyword = query.trim();
                            close();
                            navigate(
                                keyword
                                    ? `/search?q=${encodeURIComponent(keyword)}`
                                    : '/search'
                            );
                        }}
                        className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white"
                    >
                        View All Results
                    </button>
                </div>
            </div>
        </>
    );
};
