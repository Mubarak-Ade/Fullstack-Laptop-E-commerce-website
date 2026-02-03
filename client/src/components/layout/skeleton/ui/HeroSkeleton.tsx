import { Skeleton } from '@/components/ui/skeleton';

export const HeroSkeleton = () => {
    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/2 h-[90%] bg-linear-to-br from-primary/50 to-transparent rounded-l-[100px] blur-3xl opacity-30" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
                <div className=" mt-6 overflow-hidden rounded-4xl shadow-[0_10px_40px_-2px] shadow-dark-bg/10 w-full bg-dark-surface/50 [--webkit-backdrop-filter:blur(12px)] backdrop-blur-3xl px-10 py-15">
                    <Skeleton className="dark:bg-dark-surface h-4 w-50" />

                    <Skeleton className="dark:bg-dark-surface h-15 w-100 mt-4" />

                    <Skeleton className="dark:bg-dark-surface h-15 w-100 mt-2" />

                    <div className="mt-4 leading-relaxed max-w-md w-full text-lg text-secondary space-y-2">
                        <Skeleton className="dark:bg-dark-surface h-4 w-full" />
                        <Skeleton className="dark:bg-dark-surface h-4 w-full" />
                        <Skeleton className="dark:bg-dark-surface h-4 w-80" />
                    </div>

                    <div className="mt-10  flex flex-wrap gap-5">
                        <Skeleton className="bg-dark-surface justify-center cursor-pointer flex gap-2 items-center text-white h-15 w-50 rounded-[10px] font-semibold text-base" />

                        <Skeleton className="border border-dark-border dark:border-dark-border bg-transparent text-coral-black dark:text-light-bg cursor-pointer text-blace px-8 py-4 rounded-[10px] font-semibold text-base h-15 w-50" />
                    </div>
                </div>
                <Skeleton className=" aspect-square rounded-4xl shadow-2xl w-full h-120 bg-dark-surface/80 overflow-hidden">
                    <Skeleton className="h-full object-content w-full bg-dark-surface" />
                </Skeleton>
            </div>
        </section>
    );
};
