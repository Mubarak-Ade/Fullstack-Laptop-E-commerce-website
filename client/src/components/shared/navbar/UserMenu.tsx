import { LogOut, UserCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { NavLink } from 'react-router';
import { Icon } from '../Icon';
import { ACCOUNT_LINKS } from '../../../utils/constants';
import type { UserMenuProps } from './types';

export const UserMenu = ({ showMenu, menuRef, identity, logout, onClose }: UserMenuProps) => (
    <AnimatePresence>
        {showMenu && (
            <motion.div
                ref={menuRef}
                initial={{ x: 200 }}
                animate={{ x: 0 }}
                exit={{ x: 200 }}
                transition={{ duration: 0.3 }}
                className="fixed top-20 right-4 z-60 w-72 overflow-hidden rounded-2xl bg-light-fg text-sm shadow-[0_0_15px] shadow-dark-fg dark:bg-dark-fg md:right-10"
            >
                <div className="flex items-center justify-between border-b border-light-border px-5 py-5 text-lg text-secondary dark:border-dark-border">
                    {identity.type === 'user' ? (
                        <div className="flex items-center gap-2">
                            <Icon icon={UserCircle2} size={30} />
                            <span className="truncate">{identity.user?.email}</span>
                        </div>
                    ) : (
                        <p>Guest</p>
                    )}
                </div>

                <ul className="h-full w-full px-2 py-2">
                    {ACCOUNT_LINKS.map(link => (
                        <motion.li
                            key={link.label}
                            whileHover={{ backgroundColor: 'var(--color-primary)' }}
                            className="mb-2 cursor-pointer rounded-md border-light-border px-2 py-3 text-black dark:border-dark-border dark:text-white"
                        >
                            <NavLink
                                to={
                                    identity.type === 'user' && identity.user.role === 'admin'
                                        ? `/admin${link.path}`
                                        : link.path
                                }
                                onClick={onClose}
                                className="text-black dark:text-white"
                            >
                                <Icon icon={link.icon} size={20} className="ml-2 inline-block" />{' '}
                                {link.label}
                            </NavLink>
                        </motion.li>
                    ))}
                </ul>

                <div className="border-t border-light-border dark:border-dark-border">
                    {identity.type === 'user' ? (
                        <motion.button
                            whileHover={{ color: 'var(--color-primary)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                logout();
                                onClose();
                            }}
                            className="flex w-full cursor-pointer items-center gap-2 px-5 py-4 text-black dark:text-white"
                        >
                            <Icon icon={LogOut} /> Logout
                        </motion.button>
                    ) : (
                        <NavLink
                            to="/login"
                            onClick={onClose}
                            className="block w-full bg-primary px-4 py-3 text-center font-semibold text-white"
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            </motion.div>
        )}
    </AnimatePresence>
);
