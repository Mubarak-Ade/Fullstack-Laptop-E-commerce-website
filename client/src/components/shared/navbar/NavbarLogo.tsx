import { motion } from 'motion/react';

const logoAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, delay: 0.2 },
} as const;

export const NavbarLogo = () => (
    <motion.div
        initial={logoAnimation.initial}
        animate={logoAnimation.animate}
        transition={logoAnimation.transition}
    >
        <h1 className="text-2xl font-semibold font dark:text-light-bg md:text-4xl">
            SHINA<span className="text-primary">STORE</span>
        </h1>
    </motion.div>
);
