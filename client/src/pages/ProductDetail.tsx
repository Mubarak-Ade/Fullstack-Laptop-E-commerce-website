import {RelatedProduct} from "@/components/layout/RelatedProduct"
import {Preview} from "@/components/product-detail/Preview"
import BreadCrumbs from "@/components/shared/BreadCrumbs"
import {Data} from "@/data"
import type { Product } from "@/schema/product.schema";
// import type {Product} from "@/features/cart/types"
import {useParams} from "react-router"
import slugify from "slugify"

export const ProductDetail=() => {
    const {slug}=useParams()

    const product=Data.find((prod) => {
        const productName=slugify(prod.name,{
            lower: true,
            strict: true
        })
        return productName===slug
    })

    console.log(product);


    const {name,image,brand,price, specs,} = product as Product
    const {cpu,storage,ram,gpu,os,screenSize, battery} = specs
    return (
        <div className="p-5">
            <BreadCrumbs />

            <Preview brand={brand} name={name} image={image} memory={ram} processor={cpu} price={price} />

            <hr className="dark:border-dark-border border-light-border mt-15 mb-5" />

            <div className="mt-10">
                <h2 className="text-2xl font-semibold text-coral-black dark:text-white">Technical specification</h2>
                <ul className="grid mt-5 grid-cols-1 gap-5 lg:grid-cols-2">
                    <li className="flex justify-between p-5 border-b dark:border-dark-border border-light-border">
                        <span className="text-secondary">Processor</span>
                        <p className="dark:text-white text-coral-block font-medium">{cpu}</p>
                    </li>
                    <li className="flex justify-between p-5 border-b dark:border-dark-border border-light-border">
                        <span className="text-secondary">GPU</span>
                        <p className="dark:text-white text-coral-block font-medium">{gpu}</p>
                    </li>
                    <li className="flex justify-between p-5 border-b dark:border-dark-border border-light-border">
                        <span className="text-secondary">Memory</span>
                        <p className="dark:text-white text-coral-block font-medium">{ram}</p>
                    </li>
                    <li className="flex justify-between p-5 border-b dark:border-dark-border border-light-border">
                        <span className="text-secondary">Storage</span>
                        <p className="dark:text-white text-coral-block font-medium">{storage}</p>
                    </li>
                    <li className="flex justify-between p-5 border-b dark:border-dark-border border-light-border">
                        <span className="text-secondary">Resoulution</span>
                        <p className="dark:text-white text-coral-block font-medium">{cpu}</p>
                    </li>
                    <li className="flex justify-between p-5 border-b dark:border-dark-border border-light-border">
                        <span className="text-secondary">Screen Size</span>
                        <p className="dark:text-white text-coral-block font-medium">{screenSize}</p>
                    </li>
                    <li className="flex justify-between p-5 border-b dark:border-dark-border border-light-border">
                        <span className="text-secondary">OS</span>
                        <p className="dark:text-white text-coral-block font-medium">{os}</p>
                    </li>
                    <li className="flex justify-between p-5 border-b dark:border-dark-border border-light-border">
                        <span className="text-secondary">Battery</span>
                        <p className="dark:text-white text-coral-block font-medium">{battery}</p>
                    </li>
                </ul>
            </div>
            <RelatedProduct />
        </div>
    )
}
