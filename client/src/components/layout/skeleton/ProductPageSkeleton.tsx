import { BreadCrumbsSkeleton } from './ui/BreadCrumbsSkeleton';
import { FilterSidebarSkeleton } from './ui/FilterSidebarSkeleton';
import { ProductCardSkeleton } from './ui/ProductCardSkeleton';

export const ProductPageSkeleton = () => {
    return (
        <div>
            <BreadCrumbsSkeleton />
            <div className="p-10 flex gap-10 max-w-7xl w-full">
                <FilterSidebarSkeleton />
                <div className="grid gap-5 grid-cols-3 w-full">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};
