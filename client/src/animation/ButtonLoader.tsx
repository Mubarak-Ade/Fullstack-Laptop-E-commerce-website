import { motion } from 'motion/react';

export const ButtonLoader = () => {
  return (
    <motion.div 
    animate={{
        rotate: 360
    }}
    transition={{
        repeat: Infinity,
        duration: 1,
        ease: "linear"
    }}
    className='size-5 border-2 border-slate-200/40 border-t-white rounded-full' />
  )
}
