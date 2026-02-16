import { SidebarProvider } from '@/components/ui/sidebar';
import { Grid2X2, LayoutDashboard, Settings, Trophy, User } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Outlet } from 'react-router';
import type { Links } from '@/features/dashboard/types';
import { SideBar } from '../Sidebar';
import { AdminHeader } from '@/admin/components/AdminHeader';

export const AdminDashboardLayout = () => {
    const links: Links[] = [
        {
            label: 'Dashboard',
            link: '',
            title: "Dashboard Overview",
            icon: <LayoutDashboard />,
        },
        {
            label: 'Products',
            link: 'products',
            title: "Product Management",
            icon: <User />,
        },
        {
            label: 'Orders',
            link: 'orders',
            title: "Order Management",
            icon: <Trophy />,
        },
        {
            label: 'Customers',
            title: "User Management",
            link: 'users',
            icon: <Settings />,
        },
    ];

    return (
        <SidebarProvider style={{ ['--sidebar-width']: '18rem' } as CSSProperties}>
            <SideBar links={links} />
            <main className="bg-light-fg dark:bg-dark-bg overflow-hidden w-full">
                <AdminHeader  />
                <Outlet />
            </main>
        </SidebarProvider>
    );
};
