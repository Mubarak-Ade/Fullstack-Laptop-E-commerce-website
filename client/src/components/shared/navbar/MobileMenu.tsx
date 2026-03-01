import { LogOut, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { NavLink } from 'react-router';
import { Icon } from '../Icon';
import { ACCOUNT_LINKS, PRIMARY_LINKS } from '../../../utils/constants';
import type { MobileMenuProps } from './types';
import { NavbarSearch } from './NavbarSearch';

const overlayAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
} as const;

const menuAnimation = {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    transition: { duration: 0.25 },
} as const;

export const MobileMenu = ({ showMenu, identity, onClose, logout }: MobileMenuProps) => {
    const isUser = identity.type === 'user';
    const basePath = isUser && identity.user.role === 'admin' ? '/admin' : '/dashboard';

    const handleLogout = async () => {
        await logout();
        onClose();
    };

    return (
        <AnimatePresence>
            {showMenu && (
                <>
                    <motion.div
                        initial={overlayAnimation.initial}
                        animate={overlayAnimation.animate}
                        exit={overlayAnimation.exit}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/40 lg:hidden"
                    />
                    <motion.aside
                        initial={menuAnimation.initial}
                        animate={menuAnimation.animate}
                        exit={menuAnimation.exit}
                        transition={menuAnimation.transition}
                        className="fixed top-0 left-0 z-60 flex h-screen overflow-auto w-80 flex-col bg-light-bg p-6 shadow-2xl dark:bg-dark-surface lg:hidden"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h1 className="text-2xl font-semibold font dark:text-light-bg md:text-4xl">
                                SHINA<span className="text-primary">STORE</span>
                            </h1>{' '}
                            <button
                                onClick={onClose}
                                className="text-black dark:text-white"
                                aria-label="Close mobile menu"
                            >
                                <Icon icon={X} />
                            </button>
                        </div>

                        <div className="mb-5">
                            <NavbarSearch />
                            {isUser && (
                                <div className="flex items-center overflow-hidden gap-4 mt-5 border px-5 py-2.5 border-primary bg-light-fg dark:bg-dark-fg rounded-xl">
                                    <img
                                        src={identity.user.avatar}
                                        alt="Profile"
                                        className="size-12"
                                    />
                                    <div>
                                        <h2 className="font-bold text-black dark:text-white">
                                            {identity.user.fullname ? identity.user.email.split("@")[0] : identity.user.fullname}
                                        </h2>
                                        <h4 className="text-sm text-secondary">
                                            {identity.user.email}
                                        </h4>
                                    </div>
                                </div>
                            )}
                        </div>
                        <ul className="flex flex-col gap-2">
                            {PRIMARY_LINKS.map(link => (
                                <motion.li
                                    whileHover={{
                                        opacity: 1,
                                        backgroundColor: 'var(--color-primary)',
                                    }}
                                    key={link.name}
                                    className="relative rounded-xl"
                                >
                                    <NavLink
                                        to={link.link}
                                        onClick={onClose}
                                        className="flex items-center gap-3 rounded-md px-3 py-2 text-black dark:text-white"
                                    >
                                        <Icon icon={link.icon} size={18} />
                                        {link.name}
                                    </NavLink>
                                </motion.li>
                            ))}
                        </ul>

                        <hr className="border-primary my-4" />

                        <ul className=" flex flex-col gap-2">
                            {ACCOUNT_LINKS.map(link => (
                                <motion.li
                                    whileHover={{
                                        opacity: 1,
                                        backgroundColor: 'var(--color-primary)',
                                    }}
                                    className="rounded-xl"
                                    key={link.label}
                                >
                                    <NavLink
                                        to={`${basePath}${link.path}`}
                                        onClick={onClose}
                                        className="flex items-center gap-3 rounded-md px-3 py-2 text-black dark:text-white"
                                    >
                                        <Icon icon={link.icon} size={18} />
                                        {link.label}
                                    </NavLink>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="mt-auto">
                            {isUser ? (
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center justify-center gap-2 rounded-md bg-light-fg px-4 py-3 font-semibold text-black dark:bg-dark-fg dark:text-white"
                                >
                                    <Icon icon={LogOut} />
                                    Logout
                                </button>
                            ) : (
                                <NavLink
                                    to="/login"
                                    onClick={onClose}
                                    className="block w-full rounded-md bg-primary px-4 py-3 text-center font-semibold text-white"
                                >
                                    Login
                                </NavLink>
                            )}
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};
