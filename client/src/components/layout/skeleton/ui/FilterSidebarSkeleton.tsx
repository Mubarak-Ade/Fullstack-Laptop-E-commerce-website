import { Skeleton } from '@/components/ui/skeleton';

export const FilterSidebarSkeleton = () => {
    return (
        <div className="dark:bg-dark-surface rounded-xl p-5 max-w-xs w-full">
            <Skeleton className="h-6 w-28 bg-light-fg dark:bg-dark-fg" />
            <div className="mt-5 space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <Skeleton className="h-4 w-4 rounded-sm bg-light-fg dark:bg-dark-fg" />
                        <Skeleton className="h-4 w-24 bg-light-fg dark:bg-dark-fg" />
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <Skeleton className="h-6 w-32 bg-light-fg dark:bg-dark-fg" />
                <Skeleton className="h-3 w-full mt-4 bg-light-fg dark:bg-dark-fg" />
                <div className="flex mt-4 justify-between">
                    <Skeleton className="h-12 w-24 bg-light-fg dark:bg-dark-fg" />
                    <Skeleton className="h-12 w-24 bg-light-fg dark:bg-dark-fg" />
                </div>
            </div>
        </div>
    );
};
