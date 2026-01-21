import React from 'react'
import {Icon} from '../shared/Icon'
import {CheckCircle, ShieldCheck, ShoppingCart, Star, Truck} from 'lucide-react'
import { formatImage } from '@/utils/imageFormat';

interface Props {
    image: string[], 
    name: string,
    price: string,
    brand: string,
    processor?: string,
    memory?: string,
}

export const Preview=({image, name, price, brand, memory, processor }: Props) => {
    return (
        <div className="flex mt-5 gap-10">
            <div className="">
                <div className="dark:bg-dark-surface rounded-2xl p-15 max-w-2xl w-full">
                    <img src={formatImage(image[0])} alt="" className="" />
                </div>
            </div>
            <div className="">
                <span className="p-2 text-primary bg-primary/10 rounded-full text-xs font-bold">NEW ARRIVAL</span>
                <h1 className="text-5xl dark:text-light-bg mt-5 font-bold">{name}</h1>
                <div className="mt-5">
                    <span className="flex gap-2">
                        {[...Array(5)].map((_) => (
                            <Icon icon={Star} className="text-yellow-400 fill-yellow-400" />
                        ))}
                    </span>
                </div>
                <h2 className="text-3xl font-bold tracking-wider mt-5 text-primary">{price}.00</h2>
                <div className="mt-5">
                    <h6 className="dark:text-secondary">KEY HIGHLIGHTS</h6>

                    <div className="mt-5 space-y-4">
                        <p className="flex gap-2 items-center text-secondary dark:text-light-bg"><span className="text-primary fill-primary"><Icon icon={CheckCircle} /></span> {`${brand} ${processor} ${memory}`} </p>
                        <p className="flex gap-2 items-center text-secondary dark:text-light-bg"><span className="text-primary fill-primary"><Icon icon={CheckCircle} /></span> {`${brand} ${processor} ${memory}`} </p>
                        <p className="flex gap-2 items-center text-secondary dark:text-light-bg"><span className="text-primary fill-primary"><Icon icon={CheckCircle} /></span> {`${brand} ${processor} ${memory}`} </p>
                    </div>
                </div>
                <div className="mt-5">
                    <h2 className="dark:text-white text-coral-black font-bold">Unified Memory (RAM)</h2>
                    <div className="mt-2 flex justify-between gap-3">
                        <button className="w-35 py-2.5 border rounded-xl border-primary bg-primary/10 text-primary">32GB</button>
                        <button className="w-35 py-2.5 border rounded-xl border-dark-border bg-transparent text-secondary dark:text-light-bg">64GB</button>
                        <button className="w-35 py-2.5 border rounded-xl border-dark-border bg-transparent text-secondary dark:text-light-bg">120GB</button>
                    </div>
                </div>
                <div className="mt-5">
                    <h2 className="dark:text-white text-coral-black font-bold">Storage Capicity</h2>
                    <div className="mt-2 flex justify-between gap-3">
                        <button className="w-35 py-2.5 border rounded-xl border-primary bg-primary/10 text-primary">32GB</button>
                        <button className="w-35 py-2.5 border rounded-xl border-dark-border bg-transparent text-secondary dark:text-light-bg">64GB</button>
                        <button className="w-35 py-2.5 border rounded-xl border-dark-border bg-transparent text-secondary dark:text-light-bg">120GB</button>
                    </div>
                </div>
                <button className="bg-primary w-full mt-8 rounded-xl text-xl font-bold text-light-bg gap-2 flex items-center py-4 justify-center"><Icon icon={ShoppingCart} /> Add To Cart</button>
                <div className="mt-4 flex gap-5 text-secondary">
                    <p className="flex gap-4"><Icon icon={Truck} /> Free Express Shipping</p>
                    <p className="flex gap-4"><Icon icon={ShieldCheck} /> 2-Year Warranty</p>
                </div>
            </div>
        </div>
    )
}
