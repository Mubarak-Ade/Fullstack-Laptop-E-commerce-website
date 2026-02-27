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
        <div className='max-w-7xl w-full mx-auto'>
            <div className="py-1 flex md:flex-row flex-col justify-between md:items-center gap-4">
                <BreadCrumbs />
                <div className="flex gap-5 max-w-md w-full">
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
            <div>
                <ProductForm />
            </div>
        </div>
    );
};
