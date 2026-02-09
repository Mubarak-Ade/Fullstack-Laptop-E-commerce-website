import { useStore } from '@/store/store';
import { priceFormat } from '@/utils/format';
import { ChevronRight, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';
import { Icon } from '../shared/Icon';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/store/AuthStore';
import { useToast } from '@/context/ToastContext';

interface Props {
    isEmpty: boolean
    totalItems: number;
    totalPrice: number;
}

export const SummaryCard = ({ totalItems, totalPrice, isEmpty }: Props) => {
    const navigate = useNavigate();
    const showModal = useStore(s => s.showModal);
    const showToast = useToast().showToast
    const identity = useAuthStore(s => s.identity);

    const goToCheckout = () => {
        if (identity.type === 'guest') {
            showModal();
        } else {
            if (!isEmpty) {
                navigate('/checkout');
            } else {
                showToast("error", "Cart is Empty, Nothing to Checkout")
            }
        }
    };

    return (
        <div className=" p-5 rounded-xl w-full bg-light-bg dark:bg-dark-surface">
            <h2 className="text-xl dark:text-white text-coral-black font-bold">Order Summary</h2>
            <ul className="mt-5 border-b dark:border-dark-border border-light-border p-4">
                <li className="flex justify-between p-2">
                    <span className="text-secondary">Total Items</span>
                    <p className="dark:text-white text-coral-block font-bold">{totalItems}</p>
                </li>
                <li className="flex justify-between p-2">
                    <span className="text-secondary">Shipping</span>
                    <p className="dark:text-white text-coral-block font-bold">$0.00</p>
                </li>
                <li className="flex justify-between p-2">
                    <span className="text-secondary">Taxes (Estimated)</span>
                    <p className="dark:text-white text-coral-block font-bold">$477.00</p>
                </li>
            </ul>
            <div className="flex justify-between mt-5">
                <h4 className="text-xl font-bold text-coral-black dark:text-white">Total</h4>
                <h2 className="text-2xl font-bold text-primary font-technical">
                    {priceFormat(totalPrice)}
                </h2>
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToCheckout}
                className="w-full py-3 text-white mt-5 justify-center font-semibold rounded-xl text-base flex items-center gap-5 bg-primary cursor-pointer"
            >
                Proceed To Checkout
                <Icon icon={ChevronRight} />
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#0b66fe20' }}
                whileTap={{ scale: 0.9 }}
                onClick={goToCheckout}
                className="w-full py-3 text-primary mt-2 justify-center font-semibold rounded-xl text-base flex items-center gap-5 border border-primary cursor-pointer"
            >
                Pay With Paypal
                <Icon icon={CreditCard} />
            </motion.button>
        </div>
    );
};
