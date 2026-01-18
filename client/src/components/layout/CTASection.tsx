import {Award,CircleQuestionMark,Clock,ShieldCheckIcon,Star} from "lucide-react"
import {Icon} from "../shared/Icon"
import {motion} from "motion/react"

export const CTASection=() => {
    return (
        <motion.div 
        initial={{
            scale: 0
        }}
        whileInView={{
            scale: 1
        }}

        transition={{
            type: "spring",
            stiffness: 100,
            duration: 1
        }}
        className="mt-24 p-16 rounded-4xl backdrop-blur-md border border-slate-200 dark:border-dark-border text-center flex flex-col items-center justify-center bg-light-bg dark:bg-dark-surface shadow-2xl dark:shadow-dark-surface/50 shadow-slate-200/90">
            <span>
                <Icon icon={Award} className="text-blue-700" size={80} />
            </span>
            <h1 className="text-4xl mt-5 font-semibold dark:text-light-bg">The Professional's Choice</h1>
            <p className="max-w-2xl mt-5 leading-relaxed dark:text-secondary">We don't just sell electronics; we curate tools for innovation.
                Every device in our store undergoes a rigorous performance test to ensure it meets the demands of elite workflows
            </p>

            <div className="flex  dark:text-secondary items-center justify-center mt-10 gap-10 flex-wrap">
                <span className="flex items-center tracking-widest gap-2">
                    <Icon className="text-blue-700" icon={Clock} />
                    FAST SHIPPING
                </span>
                <span className="flex items-center gap-2">
                    <Icon className="text-blue-700" icon={ShieldCheckIcon} />
                    SECURE PAYMENT
                </span>
                <span className="flex items-center gap-2">
                    <Icon className="text-blue-700" icon={CircleQuestionMark} />
                    24/7 SUPPORT
                </span>
            </div>
        </motion.div>
    )
}
