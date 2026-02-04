import {Data} from "@/data"
import {ProductCard} from "../ProductCard"
import { useQuery } from "@tanstack/react-query";
import { useProducts } from "@/features/product/hooks";
import { RelatedProductSkeleton } from "./skeleton/RelatedProductSkeleton";

export const RelatedProduct = () => {

  const {data, isFetching} = useQuery(useProducts())

  if (isFetching) {
    return <RelatedProductSkeleton />
  }

  const products = data?.slice(0, 4)

  return (
    <div className="mt-10">
        <h2 className="mt-10 text-2xl text-coral-black dark:text-white font-bold">Recondmended Products</h2>
        <ul className="grid mt-5 gap-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center">
            {products?.map((product) => (
                <ProductCard key={product._id} {...product} />
            ))}
        </ul>
    </div>
  )
}
