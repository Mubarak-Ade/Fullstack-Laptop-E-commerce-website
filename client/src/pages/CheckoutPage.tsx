import { CheckoutForm } from '@/components/Checkout/CheckoutForm';
import { CheckoutSummary } from '@/components/Checkout/CheckoutSummary';
import { Icon } from '@/components/shared/Icon';
import { ChevronRight } from 'lucide-react';

export const CheckoutPage = () => {

    return (
        <div className="dark:bg-dark-bg bg-light-fg">
            <div className="p-10 max-w-6xl w-full m-auto">
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

                <div className=" flex gap-10 mt-10 lg:flex-row flex-col">
                    <CheckoutForm />
                    <CheckoutSummary />
                </div>
            </div>
        </div>
    );
};
