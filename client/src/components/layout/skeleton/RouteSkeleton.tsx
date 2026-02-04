import { Skeleton } from '@/components/ui/skeleton';
import { NavbarSkeleton } from './ui/NavbarSkeleton';

export const RouteSkeleton = () => {
    return (
        <div>
            <NavbarSkeleton />
            <div className="p-6 space-y-6">
                <Skeleton className="h-8 w-64 bg-light-fg dark:bg-dark-surface" />
                <Skeleton className="h-4 w-96 bg-light-fg dark:bg-dark-surface" />
                <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-48 w-full bg-light-fg dark:bg-dark-surface"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
