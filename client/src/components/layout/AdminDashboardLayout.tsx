import { SidebarProvider } from '@/components/ui/sidebar';
import { LayoutDashboard, Settings, Trophy, User } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Outlet } from 'react-router';
import type { Links } from '@/features/dashboard/types';
import { SideBar } from '../Sidebar';
import { AdminHeader } from '@/admin/components/AdminHeader';

const SIDEBAR_WIDTH = '18rem';

const adminLinks: Links[] = [
    {
        label: 'Dashboard',
        link: 'overview',
        title: 'Dashboard Overview',
        icon: <LayoutDashboard />,
    },
    {
        label: 'Products',
        link: 'products',
        title: 'Product Management',
        icon: <User />,
    },
    {
        label: 'Orders',
        link: 'orders',
        title: 'Order Management',
        icon: <Trophy />,
    },
    {
        label: 'Customers',
        title: 'User Management',
        link: 'users',
        icon: <Settings />,
    },
];

export const AdminDashboardLayout = () => {
    return (
        <SidebarProvider style={{ ['--sidebar-width']: SIDEBAR_WIDTH } as CSSProperties}>
            <SideBar links={adminLinks} />
            <main className="relative bg-light-fg dark:bg-dark-bg w-full min-h-svh">
                <AdminHeader />
                <section className="px-5 md:px-8 lg:px-10 py-5">
                    <Outlet />
                </section>
            </main>
        </SidebarProvider>
    );
};
