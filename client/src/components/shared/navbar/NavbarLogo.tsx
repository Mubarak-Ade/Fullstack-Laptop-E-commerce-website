import { motion } from 'motion/react';

export const NavbarLogo = () => (
    <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
    >
        <h1 className="text-2xl font-semibold font dark:text-light-bg md:text-4xl">
            SHINA<span className="text-primary">STORE</span>
        </h1>
    </motion.div>
);
