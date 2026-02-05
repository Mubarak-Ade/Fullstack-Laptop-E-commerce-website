import React from 'react'
import { useProducts } from '@/features/product/hooks';
import { formatImage } from '@/utils/imageFormat';
import { useQuery } from '@tanstack/react-query';
import { LockKeyhole } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Icon } from '../shared/Icon';
import { priceFormat } from '@/utils/format';

export const OrderSummary = () => {
    const { data, isLoading } = useQuery(useProducts());
    const navigate = useNavigate();
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const products = data?.slice(0, 3) || [];

    const handleNavigate = () => {
        navigate('/order');
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className=" p-5 rounded-xl w-full bg-light-bg dark:bg-dark-surface h-full sticky top-20"
        >
            <h2 className="text-xl dark:text-white text-coral-black font-bold">Order Summary</h2>
            <ul className="border-b border-light-border dark:border-dark-border p-2">
                {products.map(product => (
                    <li key={product._id} className="flex items-center gap-4 mt-5">
                        <img
                            src={formatImage(product.images[0])}
                            alt={product.name}
                            className="w-16 h-16 object-cover aspect-square rounded border border-light-border dark:border-dark-border"
                        />
                        <div className="flex justify-between w-full">
                            <div className="w-50">
                                <h4 className="font-bold text-coral-black dark:text-white line-clamp-1">
                                    {product.name}
                                </h4>
                                <h6 className='text-sm text-secondary'>{` ${product.ram ? product.ram : "8"}GB RAM  ${product.storage ? product.storage : "500"}GB`}</h6>
                                <h6 className='text-xs mt-2 text-black dark:text-white'>QTY: 1</h6>
                            </div>
                            <p className="text-black dark:text-white">{priceFormat(product.price)}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <ul className="mt-2 border-b dark:border-dark-border border-light-border p-2">
                <li className="flex justify-between p-2">
                    <span className="text-secondary text-sm">Total Items</span>
                    <p className="dark:text-white text-coral-block font-medium">{products.length}</p>
                </li>
                <li className="flex justify-between p-2">
                    <span className="text-secondary text-sm">Shipping</span>
                    <p className="dark:text-white text-coral-block font-medium">$0.00</p>
                </li>
                <li className="flex justify-between p-2">
                    <span className="text-secondary text-sm">Taxes (Estimated)</span>
                    <p className="dark:text-white text-coral-block font-medium">$477.00</p>
                </li>
            </ul>
            <div className="flex justify-between mt-2">
                <h4 className="text-xl font-bold text-coral-black dark:text-white">Total</h4>
                <h2 className="text-xl font-bold text-primary font-technical">1234000</h2>
            </div>
        </motion.div>
  )
}
