import {AtSign, Code, Earth, SendHorizonal} from "lucide-react"
import {Icon} from "../shared/Icon"
import {motion} from "motion/react"
export const Footer=() => {
    return (
        <motion.footer 
        initial={{
            y: 200
        }}
        whileInView={{
            y: 0
        }}
        transition={{
            duration: 1.5
        }}
        className="px-15 py-10 bg-light-surface dark:bg-dark-bg border-t dark:border-dark-border border-light-border">
            <div className="flex flex-wrap justify-between gap-10">
                <div className="">
                    <h2 className="text-3xl dark:text-light-bg font-bold">SHINA <span className="text-primary">STORE</span></h2>
                    <p className="max-w-xs dark:text-secondary text-light-text-muted mt-5">Setting the standard for technical excellence in e-commerce. Your destination for premium hardware and visionary tech tools.</p>
                    <div className="flex gap-4 mt-5 text-light-text-muted">
                        <span className="p-2 bg-light-fg dark:bg-dark-surface dark:text-light-bg rounded-2xl"><Icon icon={Earth} /></span>
                        <span className="p-2 bg-light-fg dark:bg-dark-surface dark:text-light-bg rounded-2xl"><Icon icon={AtSign} /></span>
                        <span className="p-2 bg-light-fg dark:bg-dark-surface dark:text-light-bg rounded-2xl"><Icon icon={Code} /></span>
                    </div>
                </div>
                <div className="">
                    <h6 className="text-primary font-semibold tracking-[0.2em]">PRODUCTS</h6>
                    <ul className="mt-5 dark:text-secondary space-y-4">
                        <li>Performance Laptops</li>
                        <li>Gaming Rigs</li>
                        <li>Pro Accessories</li>
                        <li>Software Licenses</li>
                    </ul>
                </div>
                <div className="">
                    <h6 className="text-primary font-semibold tracking-[0.2em]">COMPANY</h6>
                    <ul className="mt-5 dark:text-secondary  space-y-4">
                        <li>Our Mission</li>
                        <li>Technical Blog</li>
                        <li>Certifications</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="">
                    <h6 className="text-primary font-semibold tracking-[0.2em]">NEWSLETTER</h6>
                    <p className="dark:text-secondary ">Get early access to tech drops and exclusive pro-tier discounts.</p>
                    <div className="mt-5 flex gap-2 items-center">
                        <input type="email" className="max-w-xs w-full border-light-border border rounded-xl bg-light-bg dark:bg-dark-surface dark:border-dark-border px-4 py-3" />
                        <button className="bg-primary text-light-bg p-3 rounded-xl">
                            <Icon icon={SendHorizonal} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="border-t mt-5 border-light-border dark:border-dark-border  dark:text-secondary  text-light-text-secondary">
                <p className="mt-5">@ 2024 Shina Store. All hardware reserved</p>
            </div>
        </motion.footer>
    )
}
