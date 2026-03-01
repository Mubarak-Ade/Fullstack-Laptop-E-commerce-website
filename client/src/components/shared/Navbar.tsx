import { useCart } from '@/features/cart/hooks';
import { logoutUser } from '@/features/auth/api';
import { useAuthStore } from '@/store/AuthStore';
import { useThemeStore } from '@/store/ThemeStore';
import { useQuery } from '@tanstack/react-query';
import { Menu } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Icon } from './Icon';
import { DesktopNavLinks } from './navbar/DesktopNavLinks';
import { MobileMenu } from './navbar/MobileMenu';
import { NavbarActions } from './navbar/NavbarActions';
import { NavbarLogo } from './navbar/NavbarLogo';
import { ThemeToggle } from './navbar/ThemeToggle';
import { UserMenu } from './navbar/UserMenu';

const headerAnimation = {
    initial: { y: -100 },
    animate: { y: 0 },
    transition: { duration: 1, ease: 'easeOut' },
} as const;

export const Navbar = () => {
    const { scrollY } = useScroll();
    const navOpacity = useTransform(scrollY, [0, 100], [1, 0.92]);

    const { identity, logout: clearAuth } = useAuthStore();
    const { data: cart } = useQuery(useCart());

    const navigate = useNavigate();
    const userMenuRef = useRef<HTMLDivElement>(null);

    const [isFixed, setIsFixed] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const count = cart?.items.length ?? 0;
    const userAvatar = identity.type === 'user' ? identity.user.avatar : '';

    const closeMenus = () => {
        setShowUserMenu(false);
        setShowMobileMenu(false);
    };

    const handleCartClick = () => {
        closeMenus();
        navigate('/carts');
    };

    const handleUserMenuToggle = () => {
        setShowUserMenu(prev => !prev);
    };

    const handleMobileMenuOpen = () => {
        setShowMobileMenu(true);
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch {}
        clearAuth();
        closeMenus();
        navigate('/login');
    };

    useEffect(() => {
        const handleScroll = () => setIsFixed(window.scrollY >= 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!showUserMenu) return;
        const handleOutsideClick = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('pointerdown', handleOutsideClick);
        return () => document.removeEventListener('pointerdown', handleOutsideClick);
    }, [showUserMenu]);

    useEffect(() => {
        document.body.style.overflow = showMobileMenu ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [showMobileMenu]);

    return (
        <>
            <motion.header
                initial={headerAnimation.initial}
                animate={headerAnimation.animate}
                transition={headerAnimation.transition}
                style={{ opacity: navOpacity }}
                className={`z-50 flex w-full items-center justify-between border-b border-light-border bg-light-bg/10 px-4 py-4 backdrop-blur-md dark:border-dark-border md:px-8 ${isFixed ? 'fixed top-0 shadow-2xl' : 'relative'}`}
            >
                <button
                    onClick={handleMobileMenuOpen}
                    className="block lg:hidden text-black dark:text-white"
                >
                    <Icon icon={Menu} />
                </button>

                <NavbarLogo />
                <DesktopNavLinks />
                {/* <ThemeToggle theme={theme} toggleTheme={toggleTheme} /> */}

                <NavbarActions
                    count={count}
                    avatar={userAvatar}
                    onCartClick={handleCartClick}
                    onWishlistClick={() => navigate('/wishlist')}
                    onUserMenuToggle={handleUserMenuToggle}
                />

                <UserMenu
                    showMenu={showUserMenu}
                    menuRef={userMenuRef}
                    identity={identity}
                    logout={handleLogout}
                    onClose={() => setShowUserMenu(false)}
                />
            </motion.header>

            <MobileMenu
                showMenu={showMobileMenu}
                identity={identity}
                logout={handleLogout}
                onClose={() => setShowMobileMenu(false)}
            />
        </>
    );
};
