import { IconVariant } from '@/animation/Variants';
import { formatImage } from '@/utils/imageFormat';
import { Heart, ShoppingCart, UserCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Icon } from '../Icon';
import type { NavbarActionsProps } from './types';

export const NavbarActions = ({ count, onCartClick, onUserMenuToggle, avatar }: NavbarActionsProps) => (
    <div className="flex gap-4 dark:text-dark-text-primary">
        <motion.button
            animate="animate"
            initial="initial"
            variants={IconVariant}
            transition={{ duration: 0.8, delay: 0.6 }}
            onClick={onCartClick}
            className="relative rounded-sm bg-light-fg p-2 dark:bg-dark-surface"
            aria-label="Open cart"
        >
            <span className="absolute -top-2 -right-2 block size-5 rounded-full bg-primary text-sm font-bold text-white">
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
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hidden rounded-sm bg-light-fg p-2 dark:bg-dark-surface lg:block"
            aria-label="Wishlist"
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
            transition={{ duration: 0.8, delay: 0.8 }}
            onClick={onUserMenuToggle}
            className="lg:flex hidden size-10 items-center justify-center overflow-hidden rounded-sm bg-light-fg dark:bg-dark-surface"
            aria-label="Open account menu"
        >
            {avatar ? (
                <img src={avatar} className="h-full w-full object-cover" alt="User avatar" />
            ) : (
                <Icon
                    size={22}
                    icon={UserCircle2}
                    className="fill-coral-bg dark:fill-none dark:text-light-bg"
                />
            )}
        </motion.button>
    </div>
);
