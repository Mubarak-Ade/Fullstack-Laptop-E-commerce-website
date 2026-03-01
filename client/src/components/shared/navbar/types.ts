import { useAuthStore } from '@/store/AuthStore';
import type { RefObject } from 'react';

export type Identity = ReturnType<typeof useAuthStore.getState>['identity'];

export type NavbarActionsProps = {
    count: number;
    onCartClick: () => void;
    onUserMenuToggle: () => void;
    onWishlistClick?: () => void;
    avatar?: string;
};

export type UserMenuProps = {
    showMenu: boolean;
    menuRef: RefObject<HTMLDivElement | null>;
    identity: Identity;
    logout: () => Promise<void> | void;
    onClose: () => void;
};

export type MobileMenuProps = {
    showMenu: boolean;
    identity: Identity;
    onClose: () => void;
    logout: () => Promise<void> | void;
};

export type ThemeMode = 'light' | 'dark';

export type ThemeToggleProps = {
    theme: ThemeMode;
    toggleTheme: () => void;
};
