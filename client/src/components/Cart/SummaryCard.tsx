import React from 'react'
import {Icon} from '../shared/Icon'
import {ChevronRight, CreditCard} from 'lucide-react'

export const SummaryCard=() => {
    return (
        <div className='max-w-md p-5 rounded-xl w-full bg-light-bg dark:bg-dark-surface'>
            <h2 className='text-xl dark:text-white text-coral-black font-bold'>Order Summary</h2>

            <ul className="mt-5 border-b dark:border-dark-border border-light-border p-4">
                <li className="flex justify-between p-2">
                    <span className="text-secondary">Subtotal</span>
                    <p className="dark:text-white text-coral-block font-bold">$2,477.00</p>
                </li>
                <li className="flex justify-between p-2">
                    <span className="text-secondary">Shipping</span>
                    <p className="dark:text-white text-coral-block font-bold">$0.00</p>
                </li>
                <li className="flex justify-between p-2">
                    <span className="text-secondary">Taxes (Estimated)</span>
                    <p className="dark:text-white text-coral-block font-bold">$477.00</p>
                </li>
            </ul>
            <div className="flex justify-between mt-5">
                <h4 className='text-xl font-bold text-coral-black dark:text-white'>Total</h4>
                <h2 className='text-2xl font-bold text-primary font-technical'>$2675.16</h2>
            </div>

            <button className='w-full py-3 text-white mt-5 justify-center font-semibold rounded-xl text-base flex items-center gap-5 bg-primary'>
                Proceed To Checkout
                <Icon icon={ChevronRight} />
            </button>
            <button className='w-full py-3 text-primary mt-2 justify-center font-semibold rounded-xl text-base flex items-center gap-5 border border-primary'>
                Pay With Paypal
                <Icon icon={CreditCard} />
            </button>
        </div>
    )
}
