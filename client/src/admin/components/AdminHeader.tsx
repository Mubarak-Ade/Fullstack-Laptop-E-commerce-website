import { NavbarSearch } from '@/components/shared/navbar/NavbarSearch';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell } from 'lucide-react';
import { useLocation } from 'react-router';

const titleMap: Record<string, string> = {
    '/admin/overview': 'Dashboard Overview',
    '/admin/products': 'Product Management',
    '/admin/products/add': 'Add Product',
    '/admin/orders': 'Order Management',
    '/admin/me': 'Profile',
};

export const AdminHeader = () => {
    const { pathname } = useLocation();

    const dynamicTitle = pathname.startsWith('/admin/orders/')
        ? 'Order Details'
        : (titleMap[pathname] ?? 'Dashboard');

    return (
        <div className="px-5 py-4 border-b border-light-border dark:border-dark-border flex items-center gap-5">
            <button className="text-primary">
                <SidebarTrigger size="sm" />
            </button>
            <h2 className="flex-1 md:text-2xl text-xl font-bold text-black dark:text-white">
                {dynamicTitle}
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
