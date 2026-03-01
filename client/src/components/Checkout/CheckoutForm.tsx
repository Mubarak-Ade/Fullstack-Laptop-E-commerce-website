import { useToast } from '@/context/ToastContext';
import { useCreateOrder } from '@/features/order/hooks';
import { ShippingSchema, type ShippingInput } from '@/schema/order.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Mailbox, Truck } from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { InputField } from '../Form/InputField';
import { Icon } from '../shared/Icon';
import { useConfirmFakePayment, useInitPayment } from '@/features/payment/hooks';

const checkoutVariants: Variants = {
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

export const CheckoutForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShippingInput>({ resolver: zodResolver(ShippingSchema) });
    const showToast = useToast().showToast;

    const navigate = useNavigate();

    const order = useMutation(useCreateOrder());
    const initializePayment = useMutation(useInitPayment());
    const confirmPayment = useMutation(useConfirmFakePayment());

    const handleError = (error: { message: string }) => {
        showToast('error', error.message);
    };

    const onSubmit = (data: ShippingInput) => {
        order.mutate(data, {
            onSuccess: order => {
                initializePayment.mutate({ orderId: order._id, paymentMethod: data.paymentProvider }, {
                    onSuccess: payment => {
                        if (data.paymentProvider === 'PAYSTACK' && payment.authorization_url) {
                            window.location.href = payment.authorization_url;
                            return;
                        }

                        if (data.paymentProvider === 'FAKE' && payment.reference) {
                            confirmPayment.mutate(payment.reference, {
                                onSuccess: () => navigate(`/order/${order._id as string}`),
                                onError: handleError,
                            });
                            return;
                        }

                        handleError({ message: 'Unable to continue payment. Please try again.' });
                    },
                    onError: handleError,
                });
            },
            onError: handleError,
        });
    };

    return (
        <div className="max-w-3xl">
            <form id="checkout" onSubmit={handleSubmit(onSubmit)}>
                {/* Shipping Form Fields */}
                <motion.div
                    variants={checkoutVariants}
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
                        <InputField
                            {...register('firstname')}
                            label="First Name"
                            placeholder="John"
                            errors={errors.firstname}
                        />
                        <InputField
                            {...register('lastname')}
                            label="Last Name"
                            placeholder="Doe"
                            errors={errors.lastname}
                        />
                    </div>
                    <InputField
                        {...register('email')}
                        label="Email Adress"
                        placeholder="user@gmail.com"
                        errors={errors.email}
                    />
                    <InputField
                        {...register('country')}
                        label="Country"
                        placeholder="Nigeria"
                        errors={errors.country}
                    />
                    <InputField
                        {...register('address')}
                        label="Street Adress"
                        placeholder="Apt, Suite, etc. (optional)"
                        errors={errors.address}
                    />
                    <div className="flex gap-4 w-full">
                        <InputField
                            {...register('city')}
                            label="City"
                            placeholder="New York"
                            errors={errors.city}
                        />
                        <InputField
                            {...register('state')}
                            label="State/Province"
                            placeholder="NY"
                            errors={errors.state}
                        />
                        <InputField
                            {...register('postalCode')}
                            label="Zip Code"
                            placeholder="11100"
                            errors={errors.postalCode}
                        />
                    </div>
                    <InputField
                        {...register('phone')}
                        label="Phone Number"
                        placeholder="+234-0000-0000"
                        errors={errors.phone}
                    />
                </motion.div>

                <motion.div
                    variants={checkoutVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-5 flex flex-col gap-4 bg-light-bg dark:bg-dark-surface p-5 rounded-xl"
                >
                    <h4 className="text-xl font-bold flex items-center gap-4 dark:text-white text-black">
                        {' '}
                        <Icon icon={Mailbox} size={30} className="text-primary" /> Payment Method
                    </h4>

                    <div className="flex md:flex-row flex-col justify-between w-full gap-4">
                        <label
                            htmlFor="custom"
                            className="flex gap-5 w-full has-checked:border-2 p-5 rounded-xl has-checked:border-primary bg-light-fg dark:bg-dark-fg has-checked:bg-light-bg dark:has-checked:bg-dark-surface"
                        >
                            <input
                                type="radio"
                                id="custom"
                                value={'FAKE'}
                                {...register('paymentProvider')}
                                className=" accent-primary size-5 "
                            />
                            <div className="">
                                <h4 className="font-bold text-black dark:text-white">
                                    AIM PAYMENT <span className="text-green-600">Free</span>
                                </h4>
                                <p className="text-sm text-secondary">
                                    Delivery in 3-5 bussiness days
                                </p>
                            </div>
                        </label>
                        <label
                            htmlFor="paystack"
                            className="flex gap-5 w-full has-checked:border-2 p-5 rounded-xl has-checked:border-primary bg-light-fg dark:bg-dark-fg has-checked:bg-light-bg dark:has-checked:bg-dark-surface"
                        >
                            <input
                                type="radio"
                                value={'PAYSTACK'}
                                id="paystack"
                                {...register('paymentProvider')}
                                className="rounded-xl checked:accent-primary size-5"
                            />
                            <div className="">
                                <h4 className="font-bold text-black dark:text-white">
                                    Paystack  <span className="text-green-600">Free</span>
                                </h4>
                                <p className="text-sm text-secondary">
                                    Pay securely with Paystack
                                </p>
                            </div>
                        </label>
                    </div>
                    {errors.paymentProvider && (
                        <p className="text-red-500">{errors.paymentProvider.message}</p>
                    )}
                </motion.div>
                {/* <motion.div
                    variants={checkoutVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-5 flex flex-col gap-4 bg-light-bg dark:bg-dark-surface p-5 rounded-xl"
                >
                    <h4 className="text-xl font-bold flex items-center gap-4 dark:text-white text-black">
                        {' '}
                        <Icon icon={Wallet} size={30} className="text-primary" /> Payment Method
                    </h4>
                    <div className="flex md:flex-row flex-col justify-between w-full gap-4">
                        <label
                            htmlFor="card"
                            className="flex w-full gap-5 has-checked:border-2 p-5 rounded-xl has-checked:border-primary bg-light-fg dark:bg-dark-fg has-checked:bg-light-bg dark:has-checked:bg-dark-surface"
                        >
                            <input
                                type="radio"
                                value={'FAKE'}
                                id="card"
                                className="accent-primary size-5"
                            />
                            <div className="">
                                <h4 className="font-bold text-black dark:text-white flex items-center gap-2">
                                    <Icon icon={CreditCard} className="text-primary" />
                                    Wallet
                                </h4>
                                <p className="text-sm text-secondary">
                                    Pay securely with your card
                                </p>
                            </div>
                        </label>
                        <label
                            htmlFor="wallet"
                            className="flex w-full gap-5 has-checked:border-2 p-5 rounded-xl has-checked:border-primary bg-light-fg dark:bg-dark-fg has-checked:bg-light-bg dark:has-checked:bg-dark-surface"
                        >
                            <input
                                type="radio"
                                id="wallet"
                                value="PAYSTACK"
                                className="rounded-xl checked:accent-primary size-5"
                            />
                            <div className="">
                                <h4 className="font-bold text-black dark:text-white flex items-center gap-2">
                                    <Icon icon={Wallet} className="text-primary" />
                                    Credit Card
                                </h4>
                                <p className="text-sm text-secondary">Pay with </p>
                            </div>
                        </label>
                    </div>
                    <motion.div
                        variants={checkoutVariants}
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
                </motion.div> */}
            </form>
        </div>
    );
};
