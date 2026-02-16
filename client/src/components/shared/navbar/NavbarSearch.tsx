import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Icon } from '../Icon';

export const NavbarSearch = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full max-w-xs items-center gap-4 overflow-hidden rounded-full bg-light-fg pl-4 dark:bg-dark-accent dark:text-secondary flex"
    >
        <Icon icon={Search} />
        <motion.input
            type="text"
            placeholder="Search for laptops and accessories"
            className="h-full w-full py-3 md:text-sm text-xs outline-0"
        />
    </motion.div>
);
