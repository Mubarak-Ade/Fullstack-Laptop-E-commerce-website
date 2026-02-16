import { PRIMARY_LINKS } from './constants';
import { motion } from 'motion/react';
import { NavLink } from 'react-router';
import { NavbarSearch } from './NavbarSearch';

const MotionNavLink = motion.create(NavLink);

export const DesktopNavLinks = () => (
    <ul className="hidden gap-10 lg:flex items-center w-full max-w-2xl">
        {PRIMARY_LINKS.map((link, index) => (
            <MotionNavLink
                key={link.name}
                to={link.link}
                whileHover="hover"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="relative flex flex-col text-base text-secondary"
            >
                {link.name}
                <motion.span
                    initial={{ scaleX: 0 }}
                    variants={{ hover: { scaleX: 1 } }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 -bottom-0.5 left-0 h-0.5 origin-left bg-primary"
                />
            </MotionNavLink>
        ))}
        <NavbarSearch />
    </ul>
);
