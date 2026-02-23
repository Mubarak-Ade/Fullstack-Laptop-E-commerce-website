import { ProductForm } from '@/components/dashboard/ProductForm';
import BreadCrumbs from '@/components/shared/BreadCrumbs';
import { useNavigate } from 'react-router';

export const AddProductPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="py-2 px-4 flex justify-between items-center">
                <BreadCrumbs />
                <div className="flex gap-5">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="dark:text-white font-bold border border-light-border px-8 rounded-xl py-2"
                    >
                        Discard
                    </button>
                    <button
                        form="save-product"
                        className="text-white font-bold bg-primary px-8 rounded-xl py-2"
                    >
                        Save Laptop
                    </button>
                </div>
            </div>
            <ProductForm />
        </>
    );
};
