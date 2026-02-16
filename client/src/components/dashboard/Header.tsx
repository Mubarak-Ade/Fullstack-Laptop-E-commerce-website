import { IconVariant } from '@/animation/Variants';
import { useAuthStore } from '@/store/AuthStore';
import { useThemeStore } from '@/store/ThemeStore';
import { formatImage } from '@/utils/imageFormat';
import { Bell, Moon, Search, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Icon } from '../shared/Icon';

export const Header = () => {
    const identity = useAuthStore(s => s.identity);
    const {theme, toggleTheme} = useThemeStore()

    return (
        <div className="z-50 w-full bg-light-bg dark:bg-dark-surface border-b dark:border-dark-border flex  border-light-border justify-between items-center px-8 py-4 ">
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
                className="lg:flex hidden items-center gap-4 bg-light-fg dark:bg-dark-fg dark:text-secondary pl-4 overflow-hidden rounded-full max-w-md w-full"
            >
                <Icon icon={Search} />
                <motion.input
                    type="text"
                    placeholder="Search for laptops and accessories"
                    className="text-sm outline-0 py-3 w-full h-full"
                />
            </motion.div>
            <div className="flex items-center gap-5 ">
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
                            <Icon size={15} icon={Moon} />
                        ) : (
                            <Icon icon={Star} size={15} />
                        )}
                    </motion.button>
                </div>
                <motion.button
                    animate="animate"
                    initial="initial"
                    variants={IconVariant}
                    transition={{
                        duration: 0.8,
                        delay: 0.6,
                    }}
                    className="relative bg-light-fg dark:bg-dark-fg p-2 rounded-sm"
                >
                    {/* <span className="absolute text-white -right-2 -top-2 bg-primary size-5 font-bold block rounded-full text-sm">
                                {count}
                            </span> */}
                    <Icon
                        size={22}
                        icon={Bell}
                        className="fill-coral-bg dark:fill-none dark:text-light-bg"
                    />
                </motion.button>
                <motion.button
                    animate="animate"
                    initial="initial"
                    variants={IconVariant}
                    transition={{
                        duration: 0.8,
                        delay: 0.6,
                    }}
                    className="relative bg-light-fg dark:bg-dark-fg p-2 rounded-sm"
                >
                    {/* <span className="absolute text-white -right-2 -top-2 bg-primary size-5 font-bold block rounded-full text-sm">
                                {count}
                            </span> */}
                    <Icon
                        size={22}
                        icon={ShoppingBag}
                        className="fill-coral-bg dark:fill-none dark:text-light-bg"
                    />
                </motion.button>
                <hr className="border h-8 border-light-fg dark:border-dark-border" />
                {identity.type === 'user' && (
                    <div className="flex gap-2 items-center">
                        <h4 className="font-medium text-black dark:text-white">
                            {identity.user.fullname ? identity.user.fullname : identity.user.email}
                        </h4>
                        <img
                            className="size-12 border rounded-full border-light-border dark:border-dark-border"
                            src={identity.user.avatar}
                            alt={identity.user.avatar}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
