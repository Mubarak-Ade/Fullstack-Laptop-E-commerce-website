import { ProductForm } from '@/components/dashboard/ProductForm';
import BreadCrumbs from '@/components/shared/BreadCrumbs';
import { useNavigate } from 'react-router';

export const AddProductPage = () => {
    const navigate = useNavigate();

    const handleSubmitFromHeader = () => {
        const form = document.getElementById('save-product') as HTMLFormElement | null;
        form?.requestSubmit();
    };

    return (
        <div className='max-w-7xl w-full'>
            <div className="relative z-60 py-2 px-5 lg:px-10 flex md:flex-row flex-col justify-between mt-5  md:items-center pointer-events-auto">
                <BreadCrumbs />
                <div className="flex gap-5 max-w-md w-full px-5">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="dark:text-white font-bold border w-full border-light-border px-8 rounded-xl py-2"
                    >
                        Discard
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmitFromHeader}
                        className="text-white font-bold w-full bg-primary px-8 rounded-xl py-2"
                    >
                        Save Laptop
                    </button>
                </div>
            </div>
            <div className="relative z-0">
                <ProductForm />
            </div>
        </div>
    );
};
