import type { Variants } from 'motion/react';

const tapTransition = {
    duration: 0.2,
    type: 'spring',
    stiffness: 50,
} as const;

export const PrimaryBtnVariant: Variants = {
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.2,
        },
    },
    tap: {
        scale: 0.8,
        transition: tapTransition,
    },
};

export const SecondaryBtnVariant: Variants = {
    hover: {
        scale: 1.1,
        border: '1px solid var(--color-primary)',
        color: 'var(--color-primary)',
        transition: {
            duration: 0.2,
        },
    },
    tap: {
        scale: 0.8,
        transition: tapTransition,
    },
};
