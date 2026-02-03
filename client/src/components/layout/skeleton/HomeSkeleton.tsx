import { HeroSkeleton } from './ui/HeroSkeleton';
import { NavbarSkeleton } from './ui/NavbarSkeleton';

export const HomeSkeleton = (isLoading: boolean) => {
    return (
        isLoading && (
            <div className="min-h-[calc(100vh-80px)] fixed top-0 left-0 right-0 bottom-0 z-50 bg-light-bg dark:bg-dark-bg">
                <NavbarSkeleton />
                <HeroSkeleton />
            </div>
        )
    );
};
