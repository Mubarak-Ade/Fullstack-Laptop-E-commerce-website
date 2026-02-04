import { Skeleton } from '@/components/ui/skeleton';
import { BreadCrumbsSkeleton } from './BreadCrumbsSkeleton';

export const DashboardHeaderSkeleton = () => {
    return (
        <div className="py-2 px-4 border-b border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-surface">
            <BreadCrumbsSkeleton />
            <div className="flex px-4 items-center justify-between">
                <div className="flex gap-2 items-center">
                    <Skeleton className="h-10 w-10 rounded-full bg-light-fg dark:bg-dark-fg" />
                    <Skeleton className="h-8 w-56 bg-light-fg dark:bg-dark-fg" />
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-36 bg-light-fg dark:bg-dark-fg" />
                </div>
            </div>
        </div>
    );
};
