import {ProductForm} from '@/components/dashboard/ProductForm';
import {DashboardHeader} from '@/components/product-management/DashboardHeader';
import BreadCrumbs from '@/components/shared/BreadCrumbs';
import {Icon} from '@/components/shared/Icon';
import {Plus} from 'lucide-react';

export const AddProductPage=() => {
    return (
        <div>
            <div className='py-2 px-4 border-b border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-surface'>
                <BreadCrumbs />
                <div className="flex px-4 justify-between">
                    <h1 className='text-3xl font-bold dark:text-white text-black '>Add New Laptop</h1>
                    <div className="flex gap-5">
                        <button className='dark:text-white font-bold border border-light-border px-8 rounded-xl py-2'>
                            Discard
                        </button>
                        <button className='text-white font-bold bg-primary px-8 rounded-xl py-2'>
                            Save Laptop
                        </button>
                    </div>
                </div>
            </div>
            <ProductForm />
        </div>
    );
};
