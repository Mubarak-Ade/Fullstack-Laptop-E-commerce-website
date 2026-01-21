import {Data} from "@/data"
import {ProductCard} from "../ProductCard"
import { useQuery } from "@tanstack/react-query";
import { useProducts } from "@/features/product/hooks";

export const RelatedProduct = () => {

  const {data, isFetching} = useQuery(useProducts())

  if (isFetching) {
    return <p>Loading....</p>
  }

  const products = data?.slice(0, 4)

  return (
    <div className="mt-10">
        <h2 className="mt-10 text-2xl text-coral-black dark:text-white font-bold">Recondmended Products</h2>
        <ul className="grid mt-5 gap-4 grid-cols-4">
            {products?.map((product) => (
                <ProductCard key={product._id} {...product} />
            ))}
        </ul>
    </div>
  )
}
