import { ProductManagementSkeleton } from '@/components/layout/skeleton/ProductManagementSkeleton';
import BreadCrumbs from '@/components/shared/BreadCrumbs';
import { ReusableTable } from '@/components/shared/dashboard/ReusableTable';
import { Icon } from '@/components/shared/Icon';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/features/product/hooks';
import { type Product } from '@/schema/product.schema';
import { priceFormat } from '@/utils/format';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye, PenBox, Plus, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export const ProductManagement = () => {
    const { data, isLoading } = useQuery(useProducts());
    const navigate = useNavigate();
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
            <div className="relative z-[60] flex justify-between px-5 mt-2 gap-5 pointer-events-auto">
                <BreadCrumbs />
                <Link
                    to="/admin/products/add"
                    className="flex gap-2 text-white bg-primary items-center px-4 py-3 rounded-xl"
                >
                    <Icon icon={Plus} /> Add New Product
                </Link>
            </div>
            <div className="relative z-0 max-w-4xl m-auto mt-10 w-full">
                <ReusableTable columns={columns} data={data.product} pageCount={Math.ceil(((data?.total ?? 0) as number) / data.limit) ?? 1} />
            </div>
        </div>
    );
};
