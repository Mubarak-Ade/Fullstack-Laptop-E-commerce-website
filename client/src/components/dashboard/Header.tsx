import { Bell } from 'lucide-react';
import { useLocation } from 'react-router';
import { NavbarSearch } from '../shared/navbar/NavbarSearch';
import { SidebarTrigger } from '../ui/sidebar';

export const Header = () => {
    const location = useLocation()
    
        console.log(location);
    
        const header = location.state
        
    
        return (
            <div className="p-5 border-b border-light-border dark:border-dark-border flex items-center cursor-pointer gap-5">
                <button className='text-primary'>
                    <SidebarTrigger size="sm" />
                </button>
                <h2 className='flex-1 md:text-2xl text-xl font-bold text-black dark:text-white'>{header ? header.title : "Dashboard Overview"}</h2>
                <div className="lg:block hidden">
                    <NavbarSearch />
                </div>
                <button className='text-black dark:text-white'>
                    <Bell />
                </button>
            </div>
        );
};
