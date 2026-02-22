import { Clipboard, Home, Laptop, LayoutDashboard, Settings, ToolCaseIcon, User } from 'lucide-react';

export const PRIMARY_LINKS = [
    { name: 'Home', link: '/', icon: Home },
    { name: 'Laptops', link: '/products', icon: Laptop },
    { name: 'Accessories', link: '/access', icon: ToolCaseIcon },
];

export const ACCOUNT_LINKS = [
    { label: 'Profile', icon: User, path: '/dashboard' },
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Order History', icon: Clipboard, path: '/dashboard' },
    { label: 'Settings', icon: Settings, path: '/dashboard' },
];

export const status = ['PENDING_PAYMENT', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const
