import { priceFormat } from '@/utils/format';
import { formatImage } from '@/utils/imageFormat';
import { motion } from 'motion/react';

interface Props {
    products: {
        productId: string,
        productName: string,
        quantity: number,
        image: string,
        unitPriceAtPurchase: number,
    }[],
    shippingFee: number,
    subTotal: number,
    tax: number,
    total: number

}

export const OrderSummary = ({products, shippingFee, subTotal, tax, total}: Props) => {

    

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
                    <li key={product.productId} className="flex items-center gap-4 mt-5">
                        <img
                            src={formatImage(product.image)}
                            alt={product.image}
                            className="w-16 h-16 object-cover aspect-square rounded border border-light-border dark:border-dark-border"
                        />
                        <div className="flex justify-between w-full">
                            <div className="w-50">
                                <h4 className="font-bold text-coral-black dark:text-white line-clamp-1">
                                    {product.productName}
                                </h4>
                                {/* <h6 className='text-sm text-secondary'>{` ${product.ram ? product.ram : "8"}GB RAM  ${product.storage ? product.storage : "500"}GB`}</h6> */}
                                <h6 className='text-xs mt-2 text-black dark:text-white'>QTY: {product.quantity}</h6>
                            </div>
                            <p className="text-black dark:text-white">{priceFormat(product.unitPriceAtPurchase)}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <ul className="mt-2 border-b dark:border-dark-border border-light-border p-2">
                <li className="flex justify-between p-2">
                    <span className="text-secondary text-sm">Sub Total</span>
                    <p className="dark:text-white text-coral-block font-medium">{priceFormat(subTotal)}</p>
                </li>
                <li className="flex justify-between p-2">
                    <span className="text-secondary text-sm">Shipping</span>
                    <p className="dark:text-white text-coral-block font-medium">{priceFormat(shippingFee)}</p>
                </li>
                <li className="flex justify-between p-2">
                    <span className="text-secondary text-sm">Taxes (Estimated)</span>
                    <p className="dark:text-white text-coral-block font-medium">{priceFormat(tax)}</p>
                </li>
            </ul>
            <div className="flex justify-between mt-2">
                <h4 className="text-xl font-bold text-coral-black dark:text-white">Total</h4>
                <h2 className="text-xl font-bold text-primary font-technical">{priceFormat(total)}</h2>
            </div>
        </motion.div>
  )
}
