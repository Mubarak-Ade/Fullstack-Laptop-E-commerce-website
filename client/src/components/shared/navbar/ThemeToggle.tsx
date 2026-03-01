import { Moon, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Icon } from '../Icon';
import type { ThemeToggleProps } from './types';

const ToggleIcon = motion.create(Icon);

export const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {
    const isLight = theme === 'light';
    const togglePositionClass = isLight ? 'left-0' : 'right-0';
    const icon = isLight ? Moon : Star;

    return (
        <div className="relative hidden h-8 w-15 items-center gap-4 overflow-hidden rounded-full border border-dark-border bg-light-fg px-2 py-1 shadow-2xl dark:border-light-border dark:bg-dark-fg md:flex">
            <motion.button
                onClick={toggleTheme}
                layout
                transition={{ duration: 0.5 }}
                className={`absolute rounded-full bg-dark-fg p-2 text-light-bg dark:bg-light-fg dark:text-dark-bg ${togglePositionClass}`}
            >
                <ToggleIcon size={15} icon={icon} />
            </motion.button>
        </div>
    );
};
