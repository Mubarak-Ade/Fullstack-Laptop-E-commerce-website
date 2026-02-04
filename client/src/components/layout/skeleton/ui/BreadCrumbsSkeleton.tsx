import { Skeleton } from '@/components/ui/skeleton';

export const BreadCrumbsSkeleton = () => {
    return (
        <div className="px-4 py-2">
            <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-12 bg-light-fg dark:bg-dark-surface" />
                <Skeleton className="h-4 w-4 rounded-full bg-light-fg dark:bg-dark-surface" />
                <Skeleton className="h-4 w-24 bg-light-fg dark:bg-dark-surface" />
            </div>
        </div>
    );
};
