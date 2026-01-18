import {Card} from "@/components/Hero/Card"
import Image from "@/assets/pexels-life-of-pix-7974.jpg"
import {motion} from "motion/react"

export const Hero=() => {
    return (
        <motion.section
            initial={{
                opacity: 0
            }}
            whileInView={{
                opacity: 1
            }}
            transition={{
                duration: 1
            }}
            className="relative min-h-[85vh] flex items-center overflow-hidden">
            <div
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/2 h-[90%] bg-linear-to-br from-primary/50 to-transparent rounded-l-[100px] blur-3xl opacity-30">
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
                <Card />
                <motion.div
                    initial={{
                        x: 100
                    }}
                    whileInView={{
                        x: 0
                    }}
                    transition={{
                        duration: 1
                    }}
                    className=" aspect-square rounded-4xl shadow-2xl w-full border-4 border-light-border dark:border-dark-border overflow-hidden">
                    <img src={Image} alt="hero-image" className="h-full object-content w-full mix-blend-overlay  " />
                </motion.div>

            </div>
        </motion.section>
    )
}
