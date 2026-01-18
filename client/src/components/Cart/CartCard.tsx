import type {Cart} from '@/features/cart/types'
import React from 'react'
import {Icon} from '../shared/Icon'
import {Minus,Plus,Trash2} from 'lucide-react'
import {useProductStore} from '@/store/ProductStore'

export const CartCard=(product: Cart) => {
    const {image,name,price,spec,idx}=product
    const removeItem=useProductStore(s => s.removeItem)
    return (
        <div className='relative rounded-xl gap-5 p-5 bg-light-bg dark:bg-dark-surface flex '>
            <div className="bg-light-fg dark:bg-dark-fg aspect-square rounded-xl size-40 p-5">
                <img src={image} alt="" className='h-full object-cover w-full' />
            </div>
            <div className="w-full">
                <h2 className='text-2xl text-coral-black dark:text-white font-bold'>{name}</h2>
                <h6 className='mt-2 font-bold text-primary text-lg'>{price}.00</h6>
                <p className='mt-2 text-sm text-secondary'>{spec}</p>
                <div className="flex justify-between w-full mt-4">
                    <span className='bg-success/10 text-success px-2 py-2 rounded-sm font-stretch-200% tracking-wider font-technical text-sm font-bold'>IN STOCK</span>
                    <div className="bg-light-fg flex px-4 gap-5 rounded-xl py-2 w-30">
                        <button><Icon icon={Minus} size={15} /></button>
                        <input type="number" className='w-full text-center' />
                        <button><Icon icon={Plus} size={15} /></button>
                    </div>
                </div>
            </div>
            <button onClick={() => removeItem(idx)} className='absolute top-0 right-0 m-4 text-secondary'><Icon icon={Trash2} /></button>
        </div>
    )
}
