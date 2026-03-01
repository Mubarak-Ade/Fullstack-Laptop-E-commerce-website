import { CartCard } from '@/components/Cart/CartCard';
import { SummaryCard } from '@/components/Cart/SummaryCard';
import { RelatedProduct } from '@/components/layout/RelatedProduct';
import { CartSkeleton } from '@/components/layout/skeleton/CartSkeleton';
import { Icon } from '@/components/shared/Icon';
import { useCart, useClearCart } from '@/features/cart/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Frown } from 'lucide-react';

export const CartPage = () => {
    const { data: cart, isFetching } = useQuery(useCart());
    const clearCart = useMutation(useClearCart());

    if (isFetching) {
        return <CartSkeleton />;
    }

    return (
        <div className="bg-light-fg dark:bg-dark-bg">
            <div className="max-w-7xl p-5 md:p-10 w-full m-auto min-h-screen">
                <div className="flex gap-5 md:flex-row flex-col items-center">
                    <h1 className="text-4xl flex-1 text-coral-black dark:text-white font-display font-bold">
                        Shopping Cart
                    </h1>
                    <span className='text-xl text-black dark:text-white'>{cart?.totalItems ?? 0} items</span>
                    <button onClick={() => clearCart.mutate()} className='px-6 py-3 font-bold cursor-pointer bg-error text-white rounded hover:bg-coral-dark'>Clear Cart</button>
                </div>
                <div className="mt-5 flex lg:flex-row w-full flex-col gap-10 items-center justify-between">
                    <ul className="space-y-4 p-5 scrollbar-thumb scrollbar-webkit scrollbar-thin w-full overflow-y-auto flex flex-col bg-light-bg dark:bg-dark-fg h-100 rounded-xl border border-light-border shadow-2xl shadow-light-fg dark:shadow-dark-bg dark:border-dark-border">
                        {cart && cart.items?.length !== 0 ? (
                            cart.items?.map(product => <CartCard {...product} />)
                        ) : (
                            <div className="flex items-center h-full text-coral-black dark:text-white gap-2 w-full justify-center">
                                <p className="text-xl font-technical text-center ">Cart is Empty</p>
                                <Icon icon={Frown} size={30} />
                            </div>
                        )}
                    </ul>
                    <SummaryCard
                        isEmpty={cart?.items.length === 0}
                        totalItems={cart?.totalItems ?? 0}
                        totalPrice={cart?.totalPrice ?? 0}
                    />
                </div>
                <RelatedProduct />
            </div>
        </div>
    );
};
