import { NavbarSearch } from '@/components/shared/navbar/NavbarSearch';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell } from 'lucide-react';
import { useLocation } from 'react-router';

export const AdminHeader = () => {

    const location = useLocation()

    console.log(location);

    const header = location.state
    

    return (
        <div className="p-5 border-b border-light-border dark:border-dark-border flex items-center cursor-pointer gap-5">
            <button className='text-primary'>
                <SidebarTrigger size="sm" />
            </button>
            <h2 className='flex-1 text-2xl font-bold text-black dark:text-white'>{header ? header.title : "Dashboard Overview"}</h2>
            <NavbarSearch />
            <button className='text-black dark:text-white'>
                <Bell />
            </button>
        </div>
    );
};
