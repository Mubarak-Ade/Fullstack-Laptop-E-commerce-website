import { Eye, ShoppingCart, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router";
import { Icon } from "./shared/Icon";
// import type {Cart, Product} from "@/features/cart/types"
import { type Product } from "@/schema/product.schema";
import { useProductStore } from "@/store/ProductStore";
import { formatImage } from "@/utils/imageFormat";


export const ProductCard=(product: Product) => {
    const {images,name,price, cpu, gpu, storage, slug}=product??{}
 
    const spec=`${cpu} . ${gpu} . ${storage}`
    const navigate=useNavigate()

    const addToCard=useProductStore(s => s.addToCart)
    

    const handleNavigate=() => {
        navigate(`/products/${slug}`)
    }

    
    return (
        <AnimatePresence>

            <motion.div
                variants={{
                    hover: {boxShadow: "0 2px 20px var(--color-dark-surface)"},
                }}
                whileHover="hover"
                whileTap="tap"
                key={name}
                className="max-w-2xs rounded-2xl overflow-hidden cursor-pointer dark:bg-dark-surface dark:border-dark-border border border-light-border shadow-2xl flex-col w-full">
                <div className="p-6 h-60 bg-light-fg dark:bg-dark-accent">
                    <motion.img
                        variants={{
                            hover: {scale: 1.1}
                        }}
                        src={formatImage(images[0])} alt="" className="h-full w-full" />
                </div>
                <div className="p-5 space-y-2">
                    <span className="flex gap-2">
                        {[...Array(5)].map((_, index) => (
                            <Icon icon={Star} key={index} className="text-yellow-400" />
                        ))}
                    </span>
                    <motion.h4
                        variants={{
                            hover: {color: "var(--color-primary)"}
                        }}
                        className="text-xl line-clamp-1 dark:text-light-bg font-bold">{name}</motion.h4>
                    <h6 className="text-sm line-clamp-1 dark:text-secondary text-slate-600">{spec} </h6>
                </div>
                <div className="flex px-4 py-2 dark:text-light-bg justify-between items-center">
                    <h4 className="text-2xl font-bold">{price}</h4>
                    <div className="flex gap-2">
                        <motion.button
                            whileHover={{
                                scale: 1.1
                            }}
                            whileTap={{
                                scale: 0.8
                            }}
                            onClick={handleNavigate}

                            className="p-3 bg-primary text-white rounded-full">
                            <Icon icon={Eye} />
                        </motion.button>
                        <motion.button
                            whileHover={{
                                scale: 1.1
                            }}
                            whileTap={{
                                scale: 0.8
                            }}
                            // onClick={() => addToCard(product)}
                            className="p-3 bg-primary text-white rounded-full">
                            <Icon icon={ShoppingCart} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
