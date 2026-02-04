import { InputField } from '@/components/Form/InputField';
import { Icon } from '@/components/shared/Icon';
import { ChevronRight, CreditCard, Mailbox, Truck, Wallet } from 'lucide-react';
import React from 'react';

export const CheckoutPage = () => {
    return (
        <div className="p-10 dark:bg-dark-surface bg-light-fg">
            <h1 className="text-5xl font-extrabold font-technical text-black dark:text-white">
                Checkout
            </h1>

            <div className="flex items-center gap-5 mt-5">
                {['Shipping', 'Payment', 'Review'].map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <span
                            className={`px-2 py-0.5 text-white text-sm rounded-full ${index === 0 ? 'bg-primary' : 'bg-secondary/20'}`}
                        >
                            {index + 1}
                        </span>
                        <span
                            className={`text-sm font-medium ${index === 0 ? 'text-black dark:text-white' : 'text-secondary'}`}
                        >
                            {step}
                        </span>
                        {index < 2 && <Icon icon={ChevronRight} className="text-secondary" />}
                    </div>
                ))}
            </div>

            <div className="max-w-3xl w-full m-auto">
                <div className="max-w-2xl mt-10">
                    <form>
                        {/* Shipping Form Fields */}
                        <div className="mt-5 flex flex-col gap-4 bg-light-bg dark:bg-dark-surface p-5 rounded-xl">
                            <h4 className="text-xl font-bold flex items-center gap-4">
                                {' '}
                                <Icon icon={Truck} size={30} className="text-primary" /> Shipping
                                Address
                            </h4>
                            <div className="flex gap-4 w-full">
                                <InputField label="First Name" placeholder="John" />
                                <InputField label="Last Name" placeholder="Doe" />
                            </div>
                            <InputField label="Email Adress" placeholder="user@gmail.com" />
                            <InputField
                                label="Street Adress"
                                placeholder="Apt, Suite, etc. (optional)"
                            />
                            <div className="flex gap-4 w-full">
                                <InputField label="City" placeholder="New York" />
                                <InputField label="State/Province" placeholder="NY" />
                                <InputField label="Zip Codde" placeholder="11100" />
                            </div>
                            <InputField label="Phone Number" placeholder="+234-0000-0000" />
                        </div>

                        <div className="mt-5 flex flex-col gap-4 bg-light-bg dark:bg-dark-surface p-5 rounded-xl">
                            <h4 className="text-xl font-bold flex items-center gap-4">
                                {' '}
                                <Icon icon={Mailbox} size={30} className="text-primary" /> Shipping
                                Method
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
                                            Standard Shipping{' '}
                                            <span className="text-green-600">Free</span>
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
                                            Standard Shipping{' '}
                                            <span className="text-green-600">Free</span>
                                        </h4>
                                        <p className="text-sm text-secondary">
                                            Delivery in 3-5 bussiness days
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="mt-5 flex flex-col gap-4 bg-light-bg dark:bg-dark-surface p-5 rounded-xl">
                            <h4 className="text-xl font-bold flex items-center gap-4">
                                {' '}
                                <Icon icon={Wallet} size={30} className="text-primary" /> Payment
                                Method
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
                                        <p className="text-sm text-secondary">
                                            Pay with a saved wallet
                                        </p>
                                    </div>
                                </label>
                            </div>
                                <div className="mt-4 space-y-4">
                                    <InputField label="Cardholder Name" placeholder="John Doe" />
                                    <InputField
                                        label="Card Number"
                                        placeholder="1234 5678 9012 3456"
                                    />
                                    <div className="flex gap-4 w-full">
                                        <InputField label="Expiry Date" placeholder="MM/YY" />
                                        <InputField label="CVV" placeholder="123" />
                                    </div>
                                </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
