import { Card } from '@/components/Hero/Card';
import Image from '@/assets/pexels-life-of-pix-7974.jpg';
import { motion } from 'motion/react';

export const Hero = () => {
    return (
        <motion.section
            initial={{
                opacity: 0,
            }}
            whileInView={{
                opacity: 1,
            }}
            transition={{
                duration: 1,
                type: 'spring',
                damping: 200,
            }}
            layout
            className="relative min-h-[85vh] flex items-center overflow-hidden"
        >
            <motion.div
                animate={{
                    x: [0, -200, 0],
                    y: [0, 200, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                }}
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/2 h-[90%] bg-linear-to-br from-primary/90 to-transparent rounded-l-[100px] blur-3xl opacity-30"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
                <Card />
                <motion.div
                    initial={{
                        opacity: 0,
                        x: 60,
                    }}
                    animate={{
                        borderTopColor: [
                            'var(--color-primary)',
                            'var(--color-indigo-500)',
                            'var(--color-teal-500)',
                            'var(--color-slate-500)',
                        ],
                        borderRightColor: [
                            'var(--color-indigo-500)',
                            'var(--color-teal-500)',
                            'var(--color-slate-500)',
                            'var(--color-primary)',
                        ],
                        borderBottomColor: [
                            'var(--color-teal-500)',
                            'var(--color-slate-500)',
                            'var(--color-primary)',
                            'var(--color-indigo-500)',
                        ],
                        borderLeftColor: [
                            'var(--color-slate-500)',
                            'var(--color-primary)',
                            'var(--color-indigo-500)',
                            'var(--color-teal-500)',
                        ],
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        borderTopColor: {
                            repeat: Infinity,
                            duration: 1,
                            delay: 0.3
                        },
                        borderRightColor: {
                            repeat: Infinity,
                            duration: 1,
                            delay: 0.4

                        },
                        borderBottomColor: {
                            repeat: Infinity,
                            duration: 1,
                            delay: 0.5

                        },
                        borderLeftColor: {
                            repeat: Infinity,
                            duration: 1,
                            delay: 0.6
                        },
                        duration: 1,
                        delay: 0.3,
                        ease: 'easeOut',
                    }}
                    layout
                    className=" aspect-square rounded-4xl shadow-2xl w-full border-4 border-light-border dark:border-dark-border overflow-hidden"
                >
                    <img
                        src={Image}
                        alt="hero-image"
                        className="h-full object-content w-full mix-blend-overlay  "
                    />
                </motion.div>
            </div>
        </motion.section>
    );
};
