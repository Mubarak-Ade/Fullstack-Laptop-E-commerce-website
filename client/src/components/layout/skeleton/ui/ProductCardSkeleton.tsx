import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => {
    return (
        <div className="max-w-2xs rounded-2xl overflow-hidden dark:bg-dark-surface dark:border-dark-border border border-light-border shadow-2xl flex-col w-full">
            <Skeleton className="p-6 h-60 bg-light-fg dark:bg-dark-accent" />
            <div className="p-5 space-y-3">
                <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-4 w-4 rounded-full bg-light-fg dark:bg-dark-surface"
                        />
                    ))}
                </div>
                <Skeleton className="h-6 w-3/4 bg-light-fg dark:bg-dark-surface" />
                <Skeleton className="h-4 w-2/3 bg-light-fg dark:bg-dark-surface" />
            </div>
            <div className="flex px-4 py-3 items-center justify-between">
                <Skeleton className="h-7 w-20 bg-light-fg dark:bg-dark-surface" />
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-10 rounded-full bg-light-fg dark:bg-dark-surface" />
                    <Skeleton className="h-10 w-10 rounded-full bg-light-fg dark:bg-dark-surface" />
                </div>
            </div>
        </div>
    );
};
