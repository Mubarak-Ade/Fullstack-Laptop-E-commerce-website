import { IconVariant } from '@/animation/Variants';
import { useAuthStore } from '@/store/AuthStore';
import { useThemeStore } from '@/store/ThemeStore';
import { Bell, Moon, Search, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Icon } from '../shared/Icon';
import { SidebarTrigger } from '../ui/sidebar';
import { NavbarSearch } from '../shared/navbar/NavbarSearch';
import { useLocation } from 'react-router';

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
