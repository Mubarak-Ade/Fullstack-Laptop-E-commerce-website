import React from 'react'

export const SideBar=() => {
    const brands=["Apple","HP","Dell","Acer","Toshiba"]
    return (
        <div className='dark:bg-dark-surface h-fit rounded-xl p-5 max-w-xs w-full'>
            <div className="">
                <h2 className='text-xl dark:text-white font-bold'>Brands</h2>
                <ul className="space-y-2 mt-5 text-secondary">
                    {brands.map(brand => (
                        <li className=''>
                            <input type="checkbox" className='mr-4' name="" id="" />
                            {brand}
                        </li>
                    ))}
                </ul>
                <div className="mt-5">
                    <h2 className='text-xl dark:text-white font-bold'>Price Range</h2>
                    <div className="">
                        <input type="range" className='w-full' name="" id="" />
                        <div className="flex mt-4 justify-between">
                            <button className='flex flex-col gap-1 text-secondary dark:bg-dark-fg rounded-xl bg-light-bg border-2 border-light-border px-4 py-2 text-xs font-bold dark:border-dark-border '>
                                <span>MIN</span>
                                <span>$100</span>
                            </button>
                            <button className='flex flex-col gap-1 text-secondary dark:bg-dark-fg rounded-xl bg-light-bg border-2 border-light-border px-4 py-2 text-xs font-bold dark:border-dark-border '>
                                <span>MIN</span>
                                <span>$100</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
