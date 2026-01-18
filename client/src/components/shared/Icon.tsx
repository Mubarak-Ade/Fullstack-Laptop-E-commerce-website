import clsx from 'clsx'
import type {LucideIcon} from 'lucide-react'
import {motion} from 'motion/react'
import React from 'react'

interface Icon {
    icon: LucideIcon,
    className?: string,
    strokeWidth?: number
    size?: number,

}

export const Icon=({icon,className, strokeWidth, size=20}: Icon) => {
    const Icon=motion.create(icon)
    return <Icon whileTap={{scale: 0.8}} className={clsx("cursor-pointer outline-0 shrink-0",className)} size={size} strokeWidth={strokeWidth} />
}
