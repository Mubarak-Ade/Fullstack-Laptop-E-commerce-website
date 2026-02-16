import { ProductForm } from '@/components/dashboard/ProductForm';
import BreadCrumbs from '@/components/shared/BreadCrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useNavigate } from 'react-router';

export const AddProductPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className='py-2 px-4 border-b border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-surface'>
                <BreadCrumbs />
                <div className="flex px-4 justify-between">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className='cursor-pointer text-white' />
                        <h1 className='text-3xl font-bold dark:text-white text-black '>Add New Laptop</h1>
                    </div>
                    <div className="flex gap-5">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className='dark:text-white font-bold border border-light-border px-8 rounded-xl py-2'
                        >
                            Discard
                        </button>
                        <button form='save-product' className='text-white font-bold bg-primary px-8 rounded-xl py-2'>
                            Save Laptop
                        </button>
                    </div>
                </div>
            </div>
            <ProductForm />
        </div>
    );
};
