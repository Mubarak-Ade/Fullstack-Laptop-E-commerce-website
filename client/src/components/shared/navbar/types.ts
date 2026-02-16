import { useAuthStore } from '@/store/AuthStore';
import type { RefObject } from 'react';

export type Identity = ReturnType<typeof useAuthStore.getState>['identity'];

export type NavbarActionsProps = {
    count: number;
    onCartClick: () => void;
    onUserMenuToggle: () => void;
    avatar?: string;
};

export type UserMenuProps = {
    showMenu: boolean;
    menuRef: RefObject<HTMLDivElement | null>;
    identity: Identity;
    logout: () => void;
    onClose: () => void;
};

export type MobileMenuProps = {
    showMenu: boolean;
    identity: Identity;
    onClose: () => void;
    logout: () => void;
};

export type ThemeToggleProps = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
};
