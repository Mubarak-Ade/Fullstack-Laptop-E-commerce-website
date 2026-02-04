import { Skeleton } from '@/components/ui/skeleton';

export const ProductPreviewSkeleton = () => {
    return (
        <div className="flex mt-5 gap-10">
            <div className="max-w-2xl w-full">
                <Skeleton className="dark:bg-dark-fg bg-light-fg rounded-2xl h-140" />
                <div className="p-5 flex items-center gap-5 w-160 overflow-auto">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="size-35 aspect-square rounded-xl bg-light-fg dark:bg-dark-fg"
                        />
                    ))}
                </div>
            </div>
            <div className="flex-1">
                <Skeleton className="h-6 w-28 bg-light-fg dark:bg-dark-surface" />
                <Skeleton className="h-10 w-3/4 mt-5 bg-light-fg dark:bg-dark-surface" />
                <div className="mt-5 flex gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-4 w-4 rounded-full bg-light-fg dark:bg-dark-surface"
                        />
                    ))}
                </div>
                <Skeleton className="h-8 w-32 mt-5 bg-light-fg dark:bg-dark-surface" />
                <div className="mt-5 space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} className="h-4 w-2/3 bg-light-fg dark:bg-dark-surface" />
                    ))}
                </div>
                <div className="mt-6 space-y-4">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className="space-y-2">
                            <Skeleton className="h-5 w-40 bg-light-fg dark:bg-dark-surface" />
                            <div className="flex gap-3">
                                {Array.from({ length: 3 }).map((__, btnIndex) => (
                                    <Skeleton
                                        key={btnIndex}
                                        className="h-10 w-24 rounded-xl bg-light-fg dark:bg-dark-surface"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <Skeleton className="h-12 w-full mt-8 bg-light-fg dark:bg-dark-surface" />
                <div className="mt-4 flex gap-5">
                    <Skeleton className="h-4 w-40 bg-light-fg dark:bg-dark-surface" />
                    <Skeleton className="h-4 w-32 bg-light-fg dark:bg-dark-surface" />
                </div>
            </div>
        </div>
    );
};
