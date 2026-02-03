import { Skeleton } from '@/components/ui/skeleton';

export const NavbarSkeleton = () => {
    const links = [
        { name: 'Home', link: '/' },
        { name: 'Laptops', link: 'products' },
        { name: 'Accessories', link: 'access' },
    ];
    return (
        <div>
            <header
                className={`flex z-50 w-full bg-light-bg/3 backdrop-blur-md border-b dark:border-dark-border border-light-border justify-between items-center px-8 py-4 `}
            >
                <div className="">
                    <h1 className="text-4xl font dark:text-light-bg font-semibold">
                        SHINA<span className="text-primary">STORE</span>
                    </h1>
                </div>
                <ul className="lg:flex hidden gap-5">
                    {links.map((_, index) => (
                        <Skeleton key={index} className="w-20 h-5 bg-light-fg dark:bg-dark-surface" />
                    ))}
                </ul>
                <Skeleton className="lg:flex hidden items-center gap-4 bg-light-fg dark:bg-dark-surface dark:text-secondary h-10 overflow-hidden rounded-full max-w-xs w-full">
                    <Skeleton className="w-full h-full " />
                </Skeleton>
                <Skeleton className="flex gap-4 w-15 h-8 relative bg-light-fg dark:bg-dark-fg shadow-2xl px-2 py-1 overflow-hidden rounded-full border border-light-border dark:border-dark-border items-center">
                    <Skeleton className={`p-2 dark:bg-dark-surface bg-light-fg rounded-full`} />
                </Skeleton>
                <div className="flex  dark:text-dark-text-primary gap-2">
                    <Skeleton className="relative bg-light-fg dark:bg-dark-surface p-5 rounded-sm" />
                    <Skeleton className="bg-light-fg dark:bg-dark-surface p-5 rounded-sm" />
                    <Skeleton className="bg-light-fg dark:bg-dark-surface p-5 rounded-sm" />
                </div>
            </header>
        </div>
    );
};
