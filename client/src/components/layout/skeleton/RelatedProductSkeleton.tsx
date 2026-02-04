import { Skeleton } from '@/components/ui/skeleton';
import { ProductCardSkeleton } from './ui/ProductCardSkeleton';

export const RelatedProductSkeleton = () => {
    return (
        <div className="mt-10">
            <Skeleton className="h-7 w-64 bg-light-fg dark:bg-dark-surface" />
            <ul className="grid mt-5 gap-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center">
                {Array.from({ length: 4 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </ul>
        </div>
    );
};
