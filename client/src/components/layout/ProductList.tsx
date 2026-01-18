import {useState} from "react";
import {ProductCard} from "../ProductCard"
import {Data} from "@/data"
import {motion} from "motion/react";
import {CTASection} from "./CTASection";
import { useFetchProducts } from "@/features/product/hooks";

export const ProductList=() => {

    const {data, isLoading} = useFetchProducts()

    if (isLoading) {
        return <p>Loading...</p>
    }

    const brands=[...new Set(Data.map(prod => prod.brand))]



    console.log(brands);
    const [active,setActive]=useState("all")

    const filterProduct=active==="all"? data:data.filter((product) => product.brand===active)


    return (
        <div className="p-15 bg-light-surface dark:bg-dark-bg overflow-hidden">
            <div className="flex lg:flex-row flex-col gap-4 items-center p-5 justify-between">
                <motion.div
                    initial={{
                        x: -450
                    }}
                    whileInView={{
                        x: 0
                    }}
                    transition={{
                        duration: 1
                    }}
                    className="">
                    <h1 className="text-4xl dark:text-light-bg font-bold">Elite Selection</h1>
                    <h6 className="text-sm font-medium max-w-100 w-full text-gray-500 mt-2">Our hand-picked professional laptops optimized for power, battery life, and display precision</h6>
                </motion.div>
                <motion.div
                    initial={{
                        x: 500
                    }}
                    whileInView={{
                        x: 0
                    }}
                    transition={{
                        duration: 1
                    }}
                    className="bg-light-fg dark:bg-dark-surface p-2 rounded-full items-center flex">
                    <motion.button
                        whileTap={{
                            scale: 0.8
                        }}
                        onClick={() => setActive("all")} className={`px-6 py-2 cursor-pointer rounded-full ${active==="all"? "bg-blue-700 text-white ":"dark:text-secondary"}`}>All</motion.button>
                    {brands.slice(0,4).map((brand) => (
                        <motion.button
                            whileTap={{
                                scale: 0.8
                            }}
                            onClick={() => setActive(brand)} className={`px-6 py-2 cursor-pointer rounded-full ${active===brand? "bg-blue-700 text-white":"dark:text-secondary"}`}>{brand}</motion.button>
                    ))}
                </motion.div>
            </div>
            <div className="p-5">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 items-stretch place-items-center gap-5">
                    {filterProduct.slice(0,4).map((product) => (
                        <ProductCard {...product} />
                    ))}
                </div>
            </div>
            <CTASection />
        </div>
    )
}
