import { Bell } from 'lucide-react';
import { useLocation } from 'react-router';
import { NavbarSearch } from '../shared/navbar/NavbarSearch';
import { SidebarTrigger } from '../ui/sidebar';

export const Header = () => {
    const location = useLocation();
    const headerState = location.state as { title?: string } | null;
    const title = headerState?.title ?? 'Dashboard Overview';

    return (
        <div className="p-5 border-b border-light-border dark:border-dark-border flex items-center cursor-pointer gap-5">
            <button className="text-primary">
                <SidebarTrigger size="sm" />
            </button>
            <h2 className="flex-1 md:text-2xl text-xl font-bold text-black dark:text-white">
                {title}
            </h2>
            <div className="lg:block hidden">
                <NavbarSearch />
            </div>
            <button className="text-black dark:text-white">
                <Bell />
            </button>
        </div>
    );
};
