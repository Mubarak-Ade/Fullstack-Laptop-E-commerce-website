import { useCartQuantity, useDeleteCartItem } from '@/features/cart/hooks';
import type { CartItem } from '@/schema/cart.schema';
import { formatImage } from '@/utils/imageFormat';
import { useMutation } from '@tanstack/react-query';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { priceFormat } from '@/utils/format';

export const CartCard = (cart: CartItem) => {
    const { product, price, quantity } = cart;

    const [quantityCount, setQuantityCount] = useState(quantity);

    const handleQuantity = useMutation(useCartQuantity());
    const deleteCartItem = useMutation(useDeleteCartItem())

    const handleIncrease = () => {
        const newQuantity = quantityCount + 1;
        if (newQuantity < 1) return;
        setQuantityCount(newQuantity);
        handleQuantity.mutate({ productId: product._id as string, quantity: newQuantity });
    };
    const handleDecrease = () => {
        const newQuantity = quantityCount - 1;
        if (newQuantity < 1) return;
        setQuantityCount(newQuantity);
        handleQuantity.mutate({ productId: product._id as string, quantity: newQuantity });
    };
    
    return (
        <div className="relative rounded-xl gap-5 p-5 bg-light-fg dark:bg-dark-surface flex ">
            <div className="bg-light-bg dark:bg-dark-fg aspect-square rounded-xl size-40 p-5">
                <img
                    src={formatImage(product.images && product?.images[0])}
                    alt=""
                    className="h-full object-cover w-full"
                />
            </div>
            <div className="w-full">
                <h2 className="text-2xl text-coral-black dark:text-white font-bold">
                    {product.name}
                </h2>
                <h6 className="mt-2 font-bold text-primary text-lg">{priceFormat(price)}</h6>
                {/* <p className="mt-2 text-sm text-secondary">{spec}</p> */}
                <div className="flex justify-between w-full mt-4">
                    <span className="bg-success/10 text-success px-2 py-2 rounded-sm font-stretch-200% tracking-wider font-technical text-sm font-bold">
                        IN STOCK
                    </span>
                    <div className="bg-light-fg flex px-4 gap-5 rounded-xl py-2 w-30">
                        <button onClick={handleDecrease}>
                            <Icon icon={Minus} size={15} />
                        </button>
                        <input
                            value={quantityCount}
                            onChange={e => setQuantityCount(e.target.valueAsNumber)}
                            type="number"
                            className="w-full text-center"
                        />
                        <button onClick={handleIncrease}>
                            <Icon icon={Plus} size={15} />
                        </button>
                    </div>
                </div>
            </div>
            <button
                onClick={() => deleteCartItem.mutate(product._id as string)}
                className="absolute top-0 right-0 m-4 text-secondary"
            >
                <Icon icon={Trash2} />
            </button>
        </div>
    );
};
