import { Eye, ShoppingCart, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Icon } from './shared/Icon';
// import type {Cart, Product} from "@/features/cart/types"
import { useToast } from '@/context/ToastContext';
import { useAddToCart, useCart } from '@/features/cart/hooks';
import { type Product } from '@/schema/product.schema';
import { priceFormat } from '@/utils/format';
import { useMutation, useQuery } from '@tanstack/react-query';

const STAR_COUNT = 5;
const actionButtonAnimation = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.8 },
} as const;

const productCardVariants = {
    hover: { boxShadow: '10px 12px 50px 1px var(--color-primary)' },
} as const;

const imageVariants = {
    hover: { scale: 1.1 },
} as const;

const titleVariants = {
    hover: { color: 'var(--color-primary)' },
} as const;

const getCardTransitionDelay = (id: string) => 0.3 + Number(id) * 0.3;

export const ProductCard = (product: Product) => {
    const addToCartMutation = useMutation(useAddToCart());
    const { data: cart } = useQuery(useCart());
    const { showToast } = useToast();
    const { images, name, price, cpu, gpu, storage, slug } = product;

    const specSummary = `${cpu} . ${gpu} . ${storage}`;
    const navigate = useNavigate();

    const handleViewProduct = () => {
        navigate(`/products/${slug}`);
    };

    const handleAddToCartClick = () => {
        addToCartMutation.mutate(product._id, {
            onSuccess: () => {
                showToast('success', `${name} added to cart successfully`);
            },
            onError: error => {
                showToast('error', error.message);
            },
        });
    };

    // Find current product in cart so we can show the quantity badge.
    const cartItem = useMemo(
        () => cart?.items.find(item => item.product?._id === product._id),
        [cart, product._id],
    );

    return (
        <AnimatePresence>
            <motion.div
                variants={productCardVariants}
                // layoutId={product._id}
                whileHover="hover"
                whileTap="tap"
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 1,
                    delay: getCardTransitionDelay(product._id),
                }}
                key={product._id}
                className="max-w-xs rounded-2xl overflow-hidden cursor-pointer dark:bg-dark-surface dark:border-dark-border border border-light-border shadow-2xl flex-col w-full"
            >
                <div className="p-6 h-60 bg-light-fg dark:bg-dark-accent">
                    <motion.img
                        variants={imageVariants}
                        src={images[0].url}
                        alt=""
                        className="h-full w-full"
                    />
                </div>
                <div className="p-5 space-y-2">
                    <span className="flex gap-2">
                        {[...Array(STAR_COUNT)].map((_, index) => (
                            <Icon icon={Star} key={index} className="text-yellow-400" />
                        ))}
                    </span>
                    <motion.h4 variants={titleVariants} className="text-xl line-clamp-1 dark:text-light-bg font-bold">
                        {name}
                    </motion.h4>
                    <h6 className="text-sm line-clamp-1 dark:text-secondary text-slate-600">
                        {specSummary}{' '}
                    </h6>
                </div>
                <div className="flex px-4 py-2 dark:text-light-bg justify-between items-center">
                    <h4 className="text-xl font-semibold">{priceFormat(price)}</h4>
                    <div className="flex gap-2">
                        <motion.button
                            whileHover={actionButtonAnimation.whileHover}
                            whileTap={actionButtonAnimation.whileTap}
                            onClick={handleViewProduct}
                            className="p-3 bg-primary text-white rounded-full"
                        >
                            <Icon icon={Eye} />
                        </motion.button>
                        <motion.button
                            whileHover={actionButtonAnimation.whileHover}
                            whileTap={actionButtonAnimation.whileTap}
                            onClick={handleAddToCartClick}
                            className="p-3 bg-primary relative text-white rounded-full"
                        >
                            {cartItem && (
                                <span className="absolute -top-3 shadow-2xl bg- text-primary size-5 rounded-full font-technical font-medium -right-1 flex items-center justify-center">
                                    {cartItem.quantity}
                                </span>
                            )}
                            <Icon icon={ShoppingCart} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
