import { Truck, Mailbox, Wallet, CreditCard } from 'lucide-react';
import { Icon } from '../shared/Icon';
import { InputField } from '../Form/InputField';
import { motion, type Variants } from 'motion/react';

export const CheckoutForm = () => {
    const CheckoutVariants: Variants = {
        hidden: {
            opacity: 0,
            x: -50,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <div className="max-w-3xl">
            <form>
                {/* Shipping Form Fields */}
                <motion.div
                    variants={CheckoutVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col gap-4 bg-light-bg dark:bg-dark-surface p-5 rounded-xl"
                >
                    <h4 className="text-xl font-bold flex items-center gap-4 dark:text-white text-black">
                        {' '}
                        <Icon icon={Truck} size={30} className="text-primary" /> Shipping Address
                    </h4>
                    <div className="flex gap-4 w-full">
                        <InputField label="First Name" placeholder="John" />
                        <InputField label="Last Name" placeholder="Doe" />
                    </div>
                    <InputField label="Email Adress" placeholder="user@gmail.com" />
                    <InputField label="Street Adress" placeholder="Apt, Suite, etc. (optional)" />
                    <div className="flex gap-4 w-full">
                        <InputField label="City" placeholder="New York" />
                        <InputField label="State/Province" placeholder="NY" />
                        <InputField label="Zip Codde" placeholder="11100" />
                    </div>
                    <InputField label="Phone Number" placeholder="+234-0000-0000" />
                </motion.div>

                <motion.div
                    variants={CheckoutVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-5 flex flex-col gap-4 bg-light-bg dark:bg-dark-surface p-5 rounded-xl"
                >
                    <h4 className="text-xl font-bold flex items-center gap-4 dark:text-white text-black">
                        {' '}
                        <Icon icon={Mailbox} size={30} className="text-primary" /> Shipping Method
                    </h4>

                    <div className="flex gap-4">
                        <label
                            htmlFor="standard"
                            className="flex gap-5 has-checked:border-2 p-5 rounded-xl has-checked:border-primary bg-light-fg dark:bg-dark-fg has-checked:bg-light-bg dark:has-checked:bg-dark-surface"
                        >
                            <input
                                type="radio"
                                name="shipping"
                                id="standard"
                                className=" accent-primary size-5 "
                            />
                            <div className="">
                                <h4 className="font-bold text-black dark:text-white">
                                    Standard Shipping <span className="text-green-600">Free</span>
                                </h4>
                                <p className="text-sm text-secondary">
                                    Delivery in 3-5 bussiness days
                                </p>
                            </div>
                        </label>
                        <label
                            htmlFor="express"
                            className="flex gap-5 has-checked:border-2 p-5 rounded-xl has-checked:border-primary bg-light-fg dark:bg-dark-fg has-checked:bg-light-bg dark:has-checked:bg-dark-surface"
                        >
                            <input
                                type="radio"
                                name="shipping"
                                id="express"
                                className="rounded-xl checked:accent-primary size-5"
                            />
                            <div className="">
                                <h4 className="font-bold text-black dark:text-white">
                                    Standard Shipping <span className="text-green-600">Free</span>
                                </h4>
                                <p className="text-sm text-secondary">
                                    Delivery in 3-5 bussiness days
                                </p>
                            </div>
                        </label>
                    </div>
                </motion.div>
                <motion.div
                    variants={CheckoutVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-5 flex flex-col gap-4 bg-light-bg dark:bg-dark-surface p-5 rounded-xl"
                >
                    <h4 className="text-xl font-bold flex items-center gap-4 dark:text-white text-black">
                        {' '}
                        <Icon icon={Wallet} size={30} className="text-primary" /> Payment Method
                    </h4>
                    <div className="flex gap-4">
                        <label
                            htmlFor="card"
                            className="flex gap-5 has-checked:border-2 p-5 rounded-xl has-checked:border-primary bg-light-fg dark:bg-dark-fg has-checked:bg-light-bg dark:has-checked:bg-dark-surface"
                        >
                            <input
                                type="radio"
                                name="payment"
                                id="card"
                                className="accent-primary size-5"
                            />
                            <div className="">
                                <h4 className="font-bold text-black dark:text-white flex items-center gap-2">
                                    <Icon icon={CreditCard} className="text-primary" />
                                    Credit / Debit Card
                                </h4>
                                <p className="text-sm text-secondary">
                                    Pay securely with your card
                                </p>
                            </div>
                        </label>
                        <label
                            htmlFor="wallet"
                            className="flex gap-5 has-checked:border-2 p-5 rounded-xl has-checked:border-primary bg-light-fg dark:bg-dark-fg has-checked:bg-light-bg dark:has-checked:bg-dark-surface"
                        >
                            <input
                                type="radio"
                                name="payment"
                                id="wallet"
                                className="rounded-xl checked:accent-primary size-5"
                            />
                            <div className="">
                                <h4 className="font-bold text-black dark:text-white flex items-center gap-2">
                                    <Icon icon={Wallet} className="text-primary" />
                                    Wallet
                                </h4>
                                <p className="text-sm text-secondary">Pay with a saved wallet</p>
                            </div>
                        </label>
                    </div>
                    <motion.div
                        variants={CheckoutVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mt-4 space-y-4"
                    >
                        <InputField label="Cardholder Name" placeholder="John Doe" />
                        <InputField label="Card Number" placeholder="1234 5678 9012 3456" />
                        <div className="flex gap-4 w-full">
                            <InputField label="Expiry Date" placeholder="MM/YY" />
                            <InputField label="CVV" placeholder="123" />
                        </div>
                    </motion.div>
                </motion.div>
            </form>
        </div>
    );
};
