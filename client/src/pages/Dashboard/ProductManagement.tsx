import { ProductManagementSkeleton } from '@/components/layout/skeleton/ProductManagementSkeleton';
import BreadCrumbs from '@/components/shared/BreadCrumbs';
import { ReusableTable } from '@/components/shared/dashboard/ReusableTable';
import { Icon } from '@/components/shared/Icon';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/features/product/hooks';
import type { Product, ProductFilters } from '@/schema/product.schema';
import { priceFormat } from '@/utils/format';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { Eye, PenBox, Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';

export const ProductManagement = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [brand, setBrand] = useState('ALL');
    const [sort, setSort] = useState<'newest' | 'discount' | 'price-low' | 'price-high'>(
        'newest'
    );
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const query = useMemo<ProductFilters>(() => {
        return {
            page,
            limit,
            brands: brand !== 'ALL' ? [brand] : undefined,
            sort: sort === 'newest' ? undefined : sort,
            min: minPrice ? Number(minPrice) : undefined,
            max: maxPrice ? Number(maxPrice) : undefined,
        };
    }, [brand, limit, maxPrice, minPrice, page, sort]);

    const { data, isLoading, isFetching } = useQuery(useProducts(query));

    const filteredRows = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) {
            return data?.product ?? [];
        }

        return (data?.product ?? []).filter(item => {
            const name = item.name.toLowerCase();
            const itemBrand = item.brand.toLowerCase();
            return name.includes(keyword) || itemBrand.includes(keyword);
        });
    }, [data?.product, search]);

    const pagination = useMemo<PaginationState>(() => {
        return {
            pageIndex: Math.max(0, page - 1),
            pageSize: limit,
        };
    }, [limit, page]);

    const columns: ColumnDef<Product>[] = [
        {
            header: 'Laptop',
            cell: ({row}) => (
                <div className="flex items-center gap-4">
                    <img src={row.original.images[0].url} alt={row.original.images[0].public_id} className='aspect-square size-12 object-cover border rounded' />
                    <h1 className='font-bold'>{row.original.name}</h1>
                </div>
            ),
        },
        {
            header: 'Brand',
            accessorFn: row => row.brand,
        },
        {
            header: 'Price',
            accessorFn: row => priceFormat(row.price),
        },
        {
            header: 'Stocks',
            accessorFn: row => row.stocks ?? 0,
        },
        {
            id: 'action',
            header: 'Action',
            cell: ({ row }) => {
                const id = row.original._id;

                const handleEdit = () => {
                    navigate('/admin/products/add', { state: id });
                };

                return (
                    <div className="">
                        <Button
                            size={'icon'}
                            variant={'ghost'}
                            className="cursor-pointer text-red-500"
                        >
                            <Trash2 />
                        </Button>
                        <Button
                            onClick={handleEdit}
                            size={'icon'}
                            variant={'ghost'}
                            className="cursor-pointer text-blue-500"
                        >
                            <PenBox />
                        </Button>
                        <Button
                            size={'icon'}
                            variant={'ghost'}
                            className="cursor-pointer text-green-500"
                            // onClick={handleClick}
                        >
                            <Eye />
                        </Button>
                    </div>
                );
            },
        },
    ];

    if (isLoading || !data) {
        return <ProductManagementSkeleton />;
    }

    return (
        <div>
            <div className="relative z-60 flex md:flex-row flex-col justify-between px-5 mt-2 gap-5">
                <BreadCrumbs />
                <Link
                    to="/admin/products/add"
                    className="flex gap-2 text-white bg-primary items-center px-4 py-3 rounded-xl"
                >
                    <Icon icon={Plus} /> Add New Product
                </Link>
            </div>
            <div className="mt-8 rounded-xl border border-light-border dark:border-dark-border bg-card px-5 py-4 shadow-lg">
                <div className="flex flex-wrap items-end gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wide text-secondary">
                            Search
                        </label>
                        <input
                            value={search}
                            onChange={event => setSearch(event.target.value)}
                            placeholder="Product name or brand"
                            className="h-10 rounded-xl border border-light-border dark:border-dark-border bg-light-fg dark:bg-dark-fg px-3 text-sm text-coral-black dark:text-white outline-none focus:border-primary"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wide text-secondary">
                            Brand
                        </label>
                        <select
                            value={brand}
                            onChange={event => {
                                setBrand(event.target.value);
                                setPage(1);
                            }}
                            className="h-10 rounded-xl border border-light-border dark:border-dark-border bg-light-fg dark:bg-dark-fg px-3 text-sm text-coral-black dark:text-white outline-none focus:border-primary"
                        >
                            <option value="ALL">All Brands</option>
                            <option value="Apple">Apple</option>
                            <option value="Acer">Acer</option>
                            <option value="Asus">Asus</option>
                            <option value="Dell">Dell</option>
                            <option value="Hp">Hp</option>
                            <option value="Lenovo">Lenovo</option>
                            <option value="MSI">MSI</option>
                            <option value="Toshiba">Toshiba</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wide text-secondary">Sort</label>
                        <select
                            value={sort}
                            onChange={event => {
                                setSort(
                                    event.target.value as
                                        | 'newest'
                                        | 'discount'
                                        | 'price-low'
                                        | 'price-high'
                                );
                                setPage(1);
                            }}
                            className="h-10 rounded-xl border border-light-border dark:border-dark-border bg-light-fg dark:bg-dark-fg px-3 text-sm text-coral-black dark:text-white outline-none focus:border-primary"
                        >
                            <option value="newest">Newest First</option>
                            <option value="discount">Biggest Discount</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wide text-secondary">
                            Min Price
                        </label>
                        <input
                            type="number"
                            min={0}
                            value={minPrice}
                            onChange={event => {
                                setMinPrice(event.target.value);
                                setPage(1);
                            }}
                            className="h-10 rounded-xl border border-light-border dark:border-dark-border bg-light-fg dark:bg-dark-fg px-3 text-sm text-coral-black dark:text-white outline-none focus:border-primary"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wide text-secondary">
                            Max Price
                        </label>
                        <input
                            type="number"
                            min={0}
                            value={maxPrice}
                            onChange={event => {
                                setMaxPrice(event.target.value);
                                setPage(1);
                            }}
                            className="h-10 rounded-xl border border-light-border dark:border-dark-border bg-light-fg dark:bg-dark-fg px-3 text-sm text-coral-black dark:text-white outline-none focus:border-primary"
                        />
                    </div>
                    <button
                        onClick={() => {
                            setSearch('');
                            setBrand('ALL');
                            setSort('newest');
                            setMinPrice('');
                            setMaxPrice('');
                            setPage(1);
                            setLimit(10);
                        }}
                        className="h-10 rounded-xl border border-light-border dark:border-dark-border px-4 text-sm font-semibold text-secondary transition-colors hover:border-primary hover:text-primary"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
            <div className="relative z-0 max-w-4xl m-auto mt-10 w-full">
                <ReusableTable
                    columns={columns}
                    data={filteredRows}
                    pageCount={Math.ceil(((data?.total ?? 0) as number) / limit) ?? 1}
                    pagination={pagination}
                    isLoading={isFetching}
                    onPaginationChange={updater => {
                        const next =
                            typeof updater === 'function'
                                ? updater({
                                      pageIndex: pagination.pageIndex,
                                      pageSize: pagination.pageSize,
                                  })
                                : updater;

                        if (next.pageSize !== limit) {
                            setLimit(next.pageSize);
                            setPage(1);
                            return;
                        }

                        if (next.pageIndex !== pagination.pageIndex) {
                            setPage(next.pageIndex + 1);
                        }
                    }}
                />
            </div>
        </div>
    );
};
