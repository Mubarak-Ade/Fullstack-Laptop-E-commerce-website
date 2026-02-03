import type { Variants } from "motion/react";

export const PrimaryBtnVariant: Variants = {
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.2
        }
    },
    tap: {
        scale: 0.8,
        transition: {
            duration: 0.2,
            type: "spring",
            stiffness: 50
        }
    }
}