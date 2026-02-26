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
        <>
            <div className="relative z-[60] py-2 px-4 flex justify-between items-center pointer-events-auto">
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
                        type="button"
                        onClick={handleSubmitFromHeader}
                        className="text-white font-bold bg-primary px-8 rounded-xl py-2"
                    >
                        Save Laptop
                    </button>
                </div>
            </div>
            <div className="relative z-0">
                <ProductForm />
            </div>
        </>
    );
};
