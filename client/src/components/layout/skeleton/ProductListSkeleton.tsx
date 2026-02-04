import { Skeleton } from '@/components/ui/skeleton';
import { ProductCardSkeleton } from './ui/ProductCardSkeleton';

export const ProductListSkeleton = () => {
    return (
        <div className="p-15 bg-light-surface dark:bg-dark-bg overflow-hidden">
            <div className="flex lg:flex-row flex-col gap-4 items-center p-5 justify-between">
                <div>
                    <Skeleton className="h-8 w-48 bg-light-fg dark:bg-dark-surface" />
                    <Skeleton className="h-4 w-80 mt-3 bg-light-fg dark:bg-dark-surface" />
                </div>
                <div className="bg-light-fg dark:bg-dark-surface p-2 rounded-full items-center flex gap-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className="h-9 w-20 rounded-full bg-light-bg dark:bg-dark-bg" />
                    ))}
                </div>
            </div>
            <div className="p-5">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 items-stretch place-items-center gap-5">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};
