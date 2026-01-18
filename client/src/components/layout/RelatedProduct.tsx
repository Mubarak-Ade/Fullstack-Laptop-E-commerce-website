import {Data} from "@/data"
import {ProductCard} from "../ProductCard"

export const RelatedProduct = () => {
  return (
    <div className="mt-10">
        <h2 className="mt-10 text-2xl text-coral-black dark:text-white font-bold">Recondmended Products</h2>
        <ul className="grid mt-5 gap-4 grid-cols-4">
            {Data.slice(0, 4).map((product, index) => (
                <ProductCard idx={index} image={product.image} name={product.name} price={product.price} spec={product.processor} />
            ))}
        </ul>
    </div>
  )
}
