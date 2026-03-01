import { SidebarProvider } from '@/components/ui/sidebar';
import { Grid2X2, Settings, Trophy, User } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Outlet } from 'react-router';
import type { Links } from '@/features/dashboard/types';
import { SideBar } from '../Sidebar';
import { Header } from '../dashboard/Header';

const SIDEBAR_WIDTH = '18rem';

const userLinks: Links[] = [
    {
        label: 'Dashboard',
        link: 'overview',
        icon: <Grid2X2 />,
    },
    {
        label: 'Profile',
        link: 'me',
        icon: <User />,
    },
    {
        label: 'Order',
        link: 'orders',
        icon: <Trophy />,
    },
    {
        label: 'Setting',
        link: 'overview',
        icon: <Settings />,
    },
];

export const UserDashboardLayout = () => {
    return (
        <SidebarProvider style={{ ['--sidebar-width']: SIDEBAR_WIDTH } as CSSProperties}>
            <SideBar links={userLinks} />
            <main className="bg-light-fg dark:bg-dark-bg overflow-hidden w-full">
                <Header />
                <Outlet />
            </main>
        </SidebarProvider>
    );
};
