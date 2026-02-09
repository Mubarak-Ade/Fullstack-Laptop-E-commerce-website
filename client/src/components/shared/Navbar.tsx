import { useCart } from '@/features/cart/hooks';
import { useThemeStore } from '@/store/ThemeStore';
import { useQuery } from '@tanstack/react-query';
import {
    Clipboard,
    Heart,
    LayoutDashboard,
    LogOut,
    Moon,
    Search,
    Settings,
    ShoppingCart,
    Star,
    User,
    UserCircle2,
} from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform, type Variants } from 'motion/react';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Icon } from './Icon';
import { useAuthStore } from '@/store/AuthStore';

const links = [
    { name: 'Home', link: '/' },
    { name: 'Laptops', link: 'products' },
    { name: 'Accessories', link: 'access' },
];

const Link = motion.create(NavLink);

const IconVariant: Variants = {
    initial: {
        opacity: 0,
        x: -30,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
};

const navlist = [
    { label: 'Profile', icon: User, path: '/dashboard' },
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Order History', icon: Clipboard, path: '/dashboard' },
    { label: 'Setting', icon: Settings, path: '/dashboard' },
];

const ToggleIcon = motion.create(Icon);
type Identity = ReturnType<typeof useAuthStore>['identity'];

const NavbarLogo = () => (
    <motion.div
        initial={{
            scale: 0.8,
            opacity: 0,
        }}
        animate={{
            opacity: 1,
            scale: 1,
        }}
        transition={{
            duration: 0.8,
            delay: 0.2,
        }}
        className=""
    >
        <h1 className="text-4xl font dark:text-light-bg font-semibold">
            SHINA<span className="text-primary">STORE</span>
        </h1>
    </motion.div>
);

const NavbarLinks = () => (
    <ul className="lg:flex hidden gap-10">
        {links.map((link, index) => (
            <Link
                whileHover="hover"
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                initial={{
                    opacity: 0,
                    y: -40,
                }}
                transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.1,
                }}
                className="text-base text-secondary flex flex-col relative"
                key={link.name}
                to={link.link}
            >
                {link.name}
                <motion.span
                    initial={{
                        scaleX: 0,
                    }}
                    variants={{
                        hover: { scaleX: 1 },
                    }}
                    transition={{
                        duration: 0.3,
                    }}
                    className="bg-primary right-0 h-0.5 absolute -bottom-0.5 left-0 origin-left"
                />
            </Link>
        ))}
    </ul>
);

const NavbarSearch = () => (
    <motion.div
        initial={{
            opacity: 0,
            y: 20,
        }}
        animate={{
            opacity: 1,
            y: 0,
        }}
        transition={{
            duration: 0.8,
            delay: 0.6,
        }}
        whileFocus={{ scale: 2 }}
        className="lg:flex hidden items-center gap-4 bg-light-fg dark:bg-dark-accent dark:text-secondary pl-4 overflow-hidden rounded-full max-w-xs w-full"
    >
        <Icon icon={Search} />
        <motion.input
            type="text"
            placeholder="Search for laptops and accessories"
            className="text-sm outline-0 py-3 w-full h-full"
        />
    </motion.div>
);

const ThemeToggle = ({
    theme,
    toggleTheme,
}: {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}) => (
    <div className="flex gap-4 w-15 h-8 relative bg-light-fg dark:bg-dark-fg shadow-2xl px-2 py-1 overflow-hidden rounded-full border dark:border-light-border border-dark-border items-center">
        <motion.button
            onClick={toggleTheme}
            layout
            transition={{
                duration: 0.5,
            }}
            className={`p-2 ${theme === 'light' ? 'left-0' : 'right-0'} absolute className='fill-coral-black' bg-dark-fg text-light-bg dark:text-dark-bg dark:bg-light-fg rounded-full text-light-soft`}
        >
            {theme === 'light' ? (
                <ToggleIcon size={15} icon={Moon} />
            ) : (
                <ToggleIcon icon={Star} size={15} />
            )}
        </motion.button>
    </div>
);

const NavbarActions = ({
    count,
    onCartClick,
    onMenuToggle,
}: {
    count: number;
    onCartClick: () => void;
    onMenuToggle: () => void;
}) => (
    <div className="flex  dark:text-dark-text-primary gap-2">
        <motion.button
            animate="animate"
            initial="initial"
            variants={IconVariant}
            transition={{
                duration: 0.8,
                delay: 0.6,
            }}
            onClick={onCartClick}
            className="relative bg-light-fg dark:bg-dark-surface p-2 rounded-sm"
        >
            <span className="absolute text-white -right-2 -top-2 bg-primary size-5 font-bold block rounded-full text-sm">
                {count}
            </span>
            <Icon
                size={22}
                icon={ShoppingCart}
                className="fill-coral-bg dark:fill-none dark:text-light-bg"
            />
        </motion.button>
        <motion.button
            animate="animate"
            initial="initial"
            variants={IconVariant}
            transition={{
                duration: 0.8,
                delay: 0.7,
            }}
            className="bg-light-fg dark:bg-dark-surface p-2 rounded-sm"
        >
            <Icon
                size={22}
                icon={Heart}
                className="fill-coral-bg dark:fill-none dark:text-light-bg"
            />
        </motion.button>
        <motion.button
            animate="animate"
            initial="initial"
            variants={IconVariant}
            transition={{
                duration: 0.8,
                delay: 0.8,
            }}
            onClick={onMenuToggle}
            className="bg-light-fg dark:bg-dark-surface p-2 rounded-sm"
        >
            <Icon
                size={22}
                icon={UserCircle2}
                className="fill-coral-bg dark:fill-none dark:text-light-bg"
            />
        </motion.button>
    </div>
);

const UserMenu = ({
    showMenu,
    menuRef,
    identity,
    logout,
}: {
    showMenu: boolean;
    menuRef: RefObject<HTMLDivElement | null>;
    identity: Identity;
    logout: () => void;
}) => (
    <AnimatePresence>
        {showMenu && (
            <motion.div
                ref={menuRef}
                initial={{
                    x: 200,
                }}
                animate={{
                    x: 0,
                }}
                transition={{
                    duration: 1,
                }}
                exit={{
                    x: 200,
                }}
                className="dark:bg-dark-fg top-20 w-70 text-sm rounded-2xl shadow-[0_0_15px] shadow-dark-fg right-10 bg-light-fg fixed overflow-hidden"
            >
                <ul className="w-full py-2 h-full px-2">
                    <div className="px-5 text-secondary text-lg border-b border-light-border py-5 dark:border-dark-border flex items-center justify-between">
                        {identity.type === 'user' ? (
                            <div className="flex items-center gap-2 ">
                                <Icon icon={UserCircle2} size={30} />
                                <span>{identity.user?.email}</span>
                            </div>
                        ) : (
                            <p>
                                <Link to="/login" className="text-primary">
                                    Login
                                </Link>{' '}
                                To Save Cart
                            </p>
                        )}
                    </div>
                    {navlist.map(list => (
                        <motion.li
                            key={list.label}
                            whileHover={{
                                backgroundColor: 'var(--color-primary)',
                            }}
                            className=" border-light-border dark:border-dark-border px-2 py-3 rounded-md mb-2 cursor-pointer text-black dark:text-white "
                        >
                            <Link to={list.path} className="text-black dark:text-white ">
                                <Icon icon={list.icon} size={20} className="inline-block ml-2" />{' '}
                                {list.label}
                            </Link>
                        </motion.li>
                    ))}
                </ul>
                <div className="border-t border-light-border dark:border-dark-border">
                    <motion.button
                        whileHover={{
                            color: 'var(--color-primary)',
                        }}
                        whileTap={{
                            scale: 0.9,
                        }}
                        onClick={logout}
                        className="flex gap-2 items-center w-full py-4 px-5 text-black dark:text-white cursor-pointer"
                    >
                        Logout <Icon icon={LogOut} />{' '}
                    </motion.button>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
);

export const Navbar = () => {
    const { scrollY } = useScroll();

    const navAnimation = useTransform(scrollY, [0, 100], [50.9, 1]);

    const { identity, logout } = useAuthStore();

    const { data: cart, isLoading } = useQuery(useCart());

    const navigate = useNavigate();
    const [isFixed, setIsFixed] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (!showMenu) return;
        const handleOutsideClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('pointerdown', handleOutsideClick);

        return () => {
            document.removeEventListener('pointerdown', handleOutsideClick);
        };
    }, [showMenu]);

    const { theme, toggleTheme } = useThemeStore();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 10) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
    }, [isFixed]);

    const count = cart?.items.length ?? 0;

    return (
        <motion.header
            initial={{
                y: -100,
            }}
            animate={{
                y: 0,
            }}
            transition={{
                duration: 1,
                ease: 'easeOut',
            }}
            style={{
                opacity: navAnimation,
            }}
            className={`flex ${isFixed ? 'fixed top-0 shadow-2xl' : 'relative'} z-50 w-full bg-light-bg/3 backdrop-blur-md border-b dark:border-dark-border border-light-border justify-between items-center px-8 py-4 `}
        >
            <NavbarLogo />
            <NavbarLinks />
            <NavbarSearch />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <NavbarActions
                count={count}
                onCartClick={() => navigate('/carts')}
                onMenuToggle={() => setShowMenu(!showMenu)}
            />
            <UserMenu showMenu={showMenu} menuRef={menuRef} identity={identity} logout={logout} />
        </motion.header>
    );
};
