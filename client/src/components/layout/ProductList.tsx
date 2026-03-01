import { useProducts } from '@/features/product/hooks';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { ProductCard } from '../ProductCard';
import { CTASection } from './CTASection';
import { ProductListSkeleton } from './skeleton/ProductListSkeleton';

const PRODUCT_LIMIT = 4;
const BRAND_LIMIT = 4;

const sectionAnimation = {
    initial: { y: 60, opacity: 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1 },
} as const;

const titleAnimation = {
    initial: { x: -40 },
    whileInView: { x: 0 },
    viewport: { once: true },
    transition: { duration: 1 },
} as const;

const brandSelectorAnimation = {
    initial: { x: 50 },
    whileInView: { x: 0 },
    viewport: { once: true },
    transition: { duration: 1 },
} as const;

export const ProductGrid = () => {
    const { data, isLoading } = useQuery(useProducts());
    const [activeBrand, setActiveBrand] = useState('all');
    const products = data?.product ?? [];

    // Build brand filters once per products change.
    const availableBrands = useMemo(
        () => [...new Set(products.map(product => product.brand))].slice(0, BRAND_LIMIT),
        [products],
    );

    // Keep filter logic in one place to avoid inline nested conditions.
    const filteredProducts = useMemo(() => {
        if (activeBrand === 'all') {
            return products;
        }
        return products.filter(product => product.brand === activeBrand);
    }, [activeBrand, products]);

    const visibleProducts = filteredProducts.slice(0, PRODUCT_LIMIT);

    if (isLoading) {
        return <ProductListSkeleton />;
    }

    return (
        <motion.div
            initial={sectionAnimation.initial}
            whileInView={sectionAnimation.whileInView}
            viewport={sectionAnimation.viewport}
            transition={sectionAnimation.transition}
            className="mt-10 lg:p-10 bg-light-surface dark:bg-dark-bg overflow-hidden"
        >
            <div className="flex lg:flex-row flex-col gap-4 items-center p-5 justify-between">
                <motion.div
                    initial={titleAnimation.initial}
                    whileInView={titleAnimation.whileInView}
                    viewport={titleAnimation.viewport}
                    transition={titleAnimation.transition}
                    className=""
                >
                    <h1 className="text-4xl dark:text-light-bg font-bold">Elite Selection</h1>
                    <h6 className="text-sm font-medium w-full text-gray-500 mt-2">
                        Our hand-picked professional laptops optimized for power, battery life, and
                        display precision
                    </h6>
                </motion.div>
                <motion.div
                    initial={brandSelectorAnimation.initial}
                    whileInView={brandSelectorAnimation.whileInView}
                    viewport={brandSelectorAnimation.viewport}
                    transition={brandSelectorAnimation.transition}
                    className="bg-light-fg dark:bg-dark-surface p-2 rounded-full items-center flex"
                >
                    <motion.button
                        whileTap={{
                            scale: 0.8,
                        }}
                        onClick={() => setActiveBrand('all')}
                        className={`px-6 py-2 cursor-pointer rounded-full ${activeBrand === 'all' ? 'bg-blue-700 text-white ' : 'dark:text-secondary'}`}
                    >
                        All
                    </motion.button>
                    {availableBrands.map(brand => (
                        <motion.button
                            whileTap={{
                                scale: 0.8,
                            }}
                            key={brand}
                            onClick={() => setActiveBrand(brand)}
                            className={`px-6 py-2 cursor-pointer rounded-full ${activeBrand === brand ? 'bg-blue-700 text-white' : 'dark:text-secondary'}`}
                        >
                            {brand}
                        </motion.button>
                    ))}
                </motion.div>
            </div>
            <div className="">
                <AnimatePresence>
                    <motion.div
                        layout
                        className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 items-stretch place-items-center gap-5"
                    >
                        {visibleProducts.map(product => (
                            <ProductCard {...product} key={product._id} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="p-5">
                <CTASection />
            </div>
        </motion.div>
    );
};
