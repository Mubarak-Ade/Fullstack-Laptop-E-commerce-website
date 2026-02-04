import { Skeleton } from '@/components/ui/skeleton';

export const TableSkeleton = ({ rows = 6, columns = 4 }: { rows?: number; columns?: number }) => {
    return (
        <div className="w-full space-y-4">
            <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-light-border dark:border-dark-border">
                <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                    {Array.from({ length: columns }).map((_, index) => (
                        <Skeleton
                            key={`head-${index}`}
                            className="h-12 w-full bg-light-fg dark:bg-dark-surface border-b border-light-border dark:border-dark-border"
                        />
                    ))}
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <div
                            key={`row-${rowIndex}`}
                            className="contents"
                        >
                            {Array.from({ length: columns }).map((__, cellIndex) => (
                                <Skeleton
                                    key={`cell-${rowIndex}-${cellIndex}`}
                                    className="h-12 w-full bg-light-fg dark:bg-dark-bg border-b border-light-border dark:border-dark-border"
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between px-4">
                <Skeleton className="h-4 w-40 bg-light-fg dark:bg-dark-surface" />
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-28 bg-light-fg dark:bg-dark-surface" />
                    <Skeleton className="h-9 w-24 bg-light-fg dark:bg-dark-surface" />
                </div>
            </div>
        </div>
    );
};
