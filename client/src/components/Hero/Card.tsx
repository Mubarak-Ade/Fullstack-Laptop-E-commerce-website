import { ArrowRight } from "lucide-react";
import { Icon } from "../shared/Icon";
import { animate, motion, type Variants } from "motion/react";


export const Card = () => {
    const CardContentVariant: Variants = {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        }
    };

    return (
        <motion.div
            initial={ {
                opacity: 0,
                x: -60
            } }
            animate={ {
                opacity: 1,
                x: 0
            } }
            transition={ {
                duration: 1,
                delay: 0.3,
                ease: "easeOut",

            } }

            layout
            className=" mt-6 overflow-hidden rounded-4xl shadow-[0_10px_40px_-2px] shadow-dark-bg/10 w-full bg-white/3 [--webkit-backdrop-filter:blur(12px)] backdrop-blur-3xl border-light-border/50 px-10 py-15 border">
            <motion.h4 variants={ CardContentVariant } animate="animate" initial="initial" transition={ { duration: 1, delay: 0.4 } } className="text-xs text-primary  font-bold">ULTIMATE PRECISION</motion.h4>
            <motion.h1 variants={ CardContentVariant } animate="animate" initial="initial" transition={ { duration: 1, delay: 0.5 } } className="lg:text-7xl text-dark-bg text-5xl dark:text-light-bg leading-tight mt-4 font-bold flex flex-col">
                Welcome to
                <span className="text-primary">Shina Store</span>
            </motion.h1>
            <motion.p variants={ CardContentVariant } animate="animate" initial="initial" transition={ { duration: 1, delay: 0.6 } } className="mt-4 leading-relaxed max-w-md w-full text-lg text-secondary">Explore our curated collection of high-performance laptops, technical accessories, and professional-grade electronics. Built for the modern creator</motion.p>

            <motion.div variants={ CardContentVariant } animate="animate" initial="initial" className="mt-10  flex flex-wrap gap-5">
                <motion.button
                    whileHover={ {
                        scale: 1.1,
                    } }
                    whileTap={ {
                        scale: 0.8
                    } }
                    transition={ {
                        type: "spring",
                        duration: 0.5
                    } }
                    className="bg-primary justify-center cursor-pointer flex gap-2 items-center text-white px-8 py-4 rounded-[10px] font-semibold text-base">
                    EXPLORE NOW
                    <Icon icon={ ArrowRight } />
                </motion.button>
                <motion.button
                    whileTap={ {
                        scale: 0.8
                    } }
                    whileHover={ {
                        border: "1px solid var(--color-blue-600)",
                        color: "var(--color-blue-600)",
                        scale: 1.1
                    } }
                    className="border border-dark-border dark:border-dark-border bg-transparent text-coral-black dark:text-light-bg cursor-pointer text-blace px-8 py-4 rounded-[10px] font-semibold text-base">
                    VIEW CATALOG
                </motion.button>
            </motion.div>
        </motion.div>
    );
};
