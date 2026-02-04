import { DashboardHeaderSkeleton } from './ui/DashboardHeaderSkeleton';
import { TableSkeleton } from './ui/TableSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductManagementSkeleton = () => {
    return (
        <div>
            <DashboardHeaderSkeleton />
            <div className="max-w-4xl m-auto mt-10 w-full">
                <TableSkeleton />
                <div className="mt-6 flex justify-end">
                    <Skeleton className="h-10 w-40 bg-light-fg dark:bg-dark-surface" />
                </div>
            </div>
        </div>
    );
};
