import { useProducts } from '@/features/product/hooks';
import { formatImage } from '@/utils/imageFormat';
import { useQuery } from '@tanstack/react-query';
import { LockKeyhole } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Icon } from '../shared/Icon';
import { priceFormat } from '@/utils/format';
import { useCheckout } from '@/features/cart/hooks';
export const CheckoutSummary = () => {
    const { data: checkout, isFetching } = useQuery(useCheckout());

    const navigate = useNavigate();

    if(!checkout) {
        return <div>No checkout data available</div>;
    }

    if (isFetching) {
        return <div>Loading...</div>;
    }

    const handleNavigate = () => {
        navigate('/order');
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className=" p-5 rounded-xl max-w-2xl md:max-w-md w-full bg-light-bg dark:bg-dark-surface h-full sticky top-20"
        >
            <h2 className="text-xl dark:text-white text-coral-black font-bold">Order Summary</h2>
            <ul className="border-b border-light-border dark:border-dark-border p-2 h-50 overflow-auto">
                {checkout.items.map(product => (
                    <li key={product.productId} className="flex gap-4 mt-5">
                        <img
                            src={formatImage(product.image)}
                            alt={product.name}
                            className="w-16 h-16 object-cover aspect-square rounded border border-light-border dark:border-dark-border"
                        />
                        <div className="flex justify-between w-full h-full">
                            <div className="w-50">
                                <h4 className="font-bold text-coral-black dark:text-white line-clamp-1">
                                    {product.name}
                                </h4>
                                <h6 className='text-sm text-secondary'>Qty: {product.quantity}</h6>
                            </div>
                            <p className="text-black dark:text-white">{priceFormat(product.unitPriceAtCheckout)}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <ul className="mt-2 border-b dark:border-dark-border border-light-border p-4">
                <li className="flex justify-between p-2">
                    <span className="text-secondary">Sub Total</span>
                    <p className="dark:text-white text-coral-block font-bold">{priceFormat(checkout.subTotal)}</p>
                </li>
                <li className="flex justify-between p-2">
                    <span className="text-secondary">Shipping</span>
                    <p className="dark:text-white text-coral-block font-bold">{priceFormat(checkout.shipping)}</p>
                </li>
                <li className="flex justify-between p-2">
                    <span className="text-secondary">Taxes (Estimated)</span>
                    <p className="dark:text-white text-coral-block font-bold">{priceFormat(checkout.tax)}</p>
                </li>
            </ul>
            <div className="flex justify-between mt-5">
                <h4 className="text-xl font-bold text-coral-black dark:text-white">Total</h4>
                <h2 className="text-2xl font-bold text-primary font-technical">{priceFormat(checkout.total)}</h2>
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNavigate}
                className="w-full py-3 text-white mt-5 justify-center font-semibold rounded-xl text-base flex items-center gap-5 bg-primary cursor-pointer"
            >
                Place Order
                <Icon icon={LockKeyhole} />
            </motion.button>
        </motion.div>
    );
};
