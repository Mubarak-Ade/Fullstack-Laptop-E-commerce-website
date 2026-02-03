import { CheckboxField } from '@/components/Form/CheckboxField';
import { InputField } from '@/components/Form/InputField';
import { Icon } from '@/components/shared/Icon';
import { Check, Lock, Mail, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import LaptopImage from '../../assets/Images/artiom-vallat-g7boywXsC6M-unsplash.jpg';
export const SignUp = () => {
    return (
        <div className="h-screen w-full flex">
            <div
                style={{ backgroundImage: `url(${LaptopImage})` }}
                className="h-full w-full bg-cover bg-center"
            >
                <div className="h-full w-full bg-slate-700/80  p-10">
                    <h1 className="text-4xl text-white font-bold">Shina Store</h1>
                    <div className="my-40">
                        <h1 className="text-white text-5xl font-extrabold">
                            Experience the Next Generation of Tech
                        </h1>
                        <p className="text-white/80 mt-5">
                            Join our community of innovators and creators. Get access to exclusive
                            drops personalize tech recomendations
                        </p>
                    </div>
                    <div className="flex gap-10">
                        <span className="flex gap-2 items-center text-white">
                            <Icon
                                icon={Check}
                                className="p-1 text-primary border border-primary border-dashed rounded-full"
                            />
                            Original Product
                        </span>
                        <span className="flex gap-2 items-center text-white">
                            <Icon
                                size={30}
                                icon={ShieldCheck}
                                className="p-1 text-primary rounded-full"
                            />
                            Secure Payments
                        </span>
                    </div>
                </div>
            </div>
            <div className="h-full flex items-center justify-center p-20 w-full">
                <div className="w-full max-w-md">
                    <div className="">
                        <h1 className="dark:text-white text-black text-3xl font-extrabold">
                            Create Account
                        </h1>
                        <h6 className=" text-secondary text-sm">
                            Join our community of tech enthusiastic
                        </h6>
                    </div>
                    <div className="mt-2">
                        <form action="">
                            <InputField
                                label="Full Name"
                                icon={Mail}
                                placeholder="JohnDoe"
                                type="email"
                            />
                            <InputField
                                label="Email Address"
                                icon={Mail}
                                placeholder="name@example.com"
                                type="email"
                            />
                            <InputField
                                label="Password"
                                icon={Lock}
                                placeholder="Password"
                                type="email"
                            />
                            <InputField
                                label="Password"
                                icon={Lock}
                                placeholder="Password"
                                type="email"
                            />
                            <CheckboxField label="i agree to the Terms & Condition and Privacy Policy" />
                            <motion.button
                                initial={{
                                    opacity: 0,
                                    x: -40,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                transition={{
                                    duration: 1,
                                }}
                                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-primary w-full py-3 rounded-xl text-white font-bold mb-5 cursor-pointer mt-5"
                            >
                                Login
                            </motion.button>
                        </form>
                    </div>
                    <div className="flex items-center gap-4 text-secondary text-xs justify-center">
                        <hr className="w-30" />
                        <p>OR CONTINUE WITH</p>
                        <hr className="w-30" />
                    </div>
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -40,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 1,
                        }}
                        className=""
                    >
                        <button className="w-full py-3 mt-5 border border-primary rounded-xl text-primary">
                            Google
                        </button>
                    </motion.div>

                    <p className="text-sm text-secondary mt-4 text-center">
                        Already have an account?{' '}
                        <Link className="text-primary font-semibold" to="/login">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
