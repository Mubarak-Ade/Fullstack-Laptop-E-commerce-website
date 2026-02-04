import { Skeleton } from '@/components/ui/skeleton';

export const ProductFormSkeleton = () => {
    return (
        <div className="p-5 w-full">
            <div className="flex justify-center lg:items-start items-center lg:flex-row flex-col gap-10">
                <div className="space-y-5 max-w-xl w-full">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg border"
                        >
                            <Skeleton className="h-5 w-40 bg-light-fg dark:bg-dark-fg" />
                            <div className="mt-4 space-y-3">
                                {Array.from({ length: 3 }).map((__, fieldIndex) => (
                                    <Skeleton
                                        key={fieldIndex}
                                        className="h-10 w-full bg-light-fg dark:bg-dark-fg"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full max-w-xl">
                    <div className="dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg border">
                        <Skeleton className="h-5 w-32 bg-light-fg dark:bg-dark-fg" />
                        <div className="mt-4 space-y-3">
                            <Skeleton className="h-10 w-40 bg-light-fg dark:bg-dark-fg" />
                            <Skeleton className="h-10 w-40 bg-light-fg dark:bg-dark-fg" />
                        </div>
                        <div className="mt-6">
                            <Skeleton className="h-11 w-full bg-light-fg dark:bg-dark-fg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
