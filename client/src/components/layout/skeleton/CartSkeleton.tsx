import { Skeleton } from '@/components/ui/skeleton';
import { NavbarSkeleton } from './ui/NavbarSkeleton';

export const CartSkeleton = ({ cart = [1, 2, 3] }) => {
    return (
        <div className="fixed top-0 left-0 z-50 w-full">
            <NavbarSkeleton />
            <div className="bg-light-bg dark:bg-dark-bg">
                <div className="max-w-6xl p-5 w-full m-auto min-h-screen">
                    <Skeleton className="h-15 w-80 p-2 bg-light-fg dark:bg-dark-surface" />
                    <div className="mt-5 flex lg:flex-row flex-col gap-5 items-center justify-between">
                        <Skeleton className="space-y-4 p-5 scrollbar-thumb scrollbar-webkit scrollbar-thin max-w-xl w-full overflow-y-auto flex flex-col bg-light-fg dark:bg-dark-fg h-100 rounded-xl">
                            {cart.map((_, index) => (
                                <Skeleton key={index} className="h-40 w-full bg-light-fg dark:bg-dark-surface" />
                            ))}
                        </Skeleton>
                        <Skeleton className="max-w-md bg-light-fg dark:bg-dark-surface w-full p-5">
                            <Skeleton className="h-8 w-70 bg-light-fg dark:bg-dark-fg" />
                            <div className="mt-10 space-y-4 px-6">
                                <div className="flex justify-between">
                                    <Skeleton className="h-8 w-40 bg-light-fg dark:bg-dark-fg" />
                                    <Skeleton className="h-8 w-20 bg-light-fg dark:bg-dark-fg" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-8 w-40 bg-light-fg dark:bg-dark-fg" />
                                    <Skeleton className="h-8 w-20 bg-light-fg dark:bg-dark-fg" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-8 w-40 bg-light-fg dark:bg-dark-fg" />
                                    <Skeleton className="h-8 w-20 bg-light-fg dark:bg-dark-fg" />
                                </div>
                            </div>
                            <div className="flex mt-10 justify-between">
                                <Skeleton className="h-8 w-20 bg-light-fg dark:bg-dark-fg" />
                                <Skeleton className="h-8 w-50 bg-light-fg dark:bg-dark-fg" />
                            </div>
                            <div className="mt-5 space-y-2">
                                <Skeleton className="h-12 w-full bg-light-fg dark:bg-dark-fg" />
                                <Skeleton className="h-12 w-full bg-light-fg dark:bg-dark-fg" />
                            </div>
                        </Skeleton>
                    </div>
                </div>
            </div>
        </div>
    );
};
