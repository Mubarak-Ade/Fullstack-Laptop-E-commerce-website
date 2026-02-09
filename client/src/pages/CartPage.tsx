import { CartCard } from '@/components/Cart/CartCard';
import { SummaryCard } from '@/components/Cart/SummaryCard';
import { RelatedProduct } from '@/components/layout/RelatedProduct';
import { CartSkeleton } from '@/components/layout/skeleton/CartSkeleton';
import { Icon } from '@/components/shared/Icon';
import { useCart } from '@/features/cart/hooks';
import { useQuery } from '@tanstack/react-query';
import { Frown } from 'lucide-react';

export const CartPage = () => {
    const { data: cart, isLoading } = useQuery(useCart());

    if (isLoading) {
        return <CartSkeleton />;
    }

    return (
        <div className="bg-light-fg dark:bg-dark-bg">
            <div className="max-w-6xl p-5 w-full m-auto min-h-screen">
                <h1 className="text-5xl text-coral-black dark:text-white font-display font-bold">
                    Shopping Cart
                </h1>
                <div className="mt-5 flex lg:flex-row w-full flex-col gap-5 items-center justify-between">
                    <ul className="space-y-4 p-5 scrollbar-thumb scrollbar-webkit scrollbar-thin max-w-xl w-full overflow-y-auto flex flex-col bg-light-bg dark:bg-dark-fg h-100 rounded-xl border border-light-border shadow-2xl shadow-light-fg dark:shadow-dark-bg dark:border-dark-border">
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
