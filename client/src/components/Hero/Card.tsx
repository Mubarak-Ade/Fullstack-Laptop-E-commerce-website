import {ArrowRight} from "lucide-react"
import {Icon} from "../shared/Icon"
import {motion} from "motion/react"


export const Card=() => {
    return (
        <motion.div
            initial={{
                scale: 0
            }}
            whileInView={{
                scale: 1
            }}
            transition={{
                duration: 1
            }}
            className=" mt-6 overflow-hidden rounded-4xl shadow-[0_10px_40px_-2px] shadow-dark-bg/10 w-full bg-white/3 [--webkit-backdrop-filter:blur(12px)] backdrop-blur-3xl border-light-border/50 px-10 py-15 border">
            <h4 className="text-xs text-primary  font-bold">ULTIMATE PRECISION</h4>
            <h1 className="lg:text-7xl text-dark-bg text-5xl dark:text-light-bg leading-tight mt-4 font-bold flex flex-col">
                Welcome to
                <span className="text-primary">Shina Store</span>
            </h1>
            <p className="mt-4 leading-relaxed max-w-md w-full text-lg text-secondary">Explore our curated collection of high-performance laptops, technical accessories, and professional-grade electronics. Built for the modern creator</p>
            <div className="mt-10  flex flex-wrap gap-5">
                <motion.button
                    whileHover={{
                        scale: 1.1,
                    }}
                    whileTap={{
                        scale: 0.8
                    }}
                    className="bg-primary justify-center cursor-pointer flex gap-2 items-center text-white px-8 py-4 rounded-[10px] font-semibold text-base">
                    EXPLORE NOW
                    <Icon icon={ArrowRight} />
                </motion.button>
                <motion.button
                    whileTap={{
                        scale: 0.8
                    }}
                    whileHover={{
                        border: "1px solid var(--color-blue-600)",
                        color: "var(--color-blue-600)",
                        scale: 1.1
                    }}
                    className="border border-dark-border dark:border-dark-border bg-transparent text-coral-black dark:text-light-bg cursor-pointer text-blace px-8 py-4 rounded-[10px] font-semibold text-base">
                    VIEW CATALOG
                </motion.button>
            </div>
        </motion.div>
    )
}
