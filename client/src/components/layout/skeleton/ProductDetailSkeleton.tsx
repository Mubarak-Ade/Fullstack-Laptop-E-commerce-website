import { BreadCrumbsSkeleton } from './ui/BreadCrumbsSkeleton';
import { ProductCardSkeleton } from './ui/ProductCardSkeleton';
import { ProductPreviewSkeleton } from './ui/ProductPreviewSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductDetailSkeleton = () => {
    return (
        <div className="p-5">
            <BreadCrumbsSkeleton />
            <ProductPreviewSkeleton />
            <hr className="dark:border-dark-border border-light-border mt-15 mb-5" />
            <div className="mt-10">
                <Skeleton className="h-7 w-64 bg-light-fg dark:bg-dark-surface" />
                <ul className="grid mt-5 grid-cols-1 gap-5 lg:grid-cols-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <li
                            key={index}
                            className="flex justify-between p-5 border-b dark:border-dark-border border-light-border"
                        >
                            <Skeleton className="h-4 w-28 bg-light-fg dark:bg-dark-surface" />
                            <Skeleton className="h-4 w-32 bg-light-fg dark:bg-dark-surface" />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-10">
                <Skeleton className="h-7 w-56 bg-light-fg dark:bg-dark-surface" />
                <ul className="grid mt-5 gap-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                </ul>
            </div>
        </div>
    );
};
