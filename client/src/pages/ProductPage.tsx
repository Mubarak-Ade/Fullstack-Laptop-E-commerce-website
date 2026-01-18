import { SideBar } from '@/components/layout/SideBar';
import { ProductCard } from '@/components/ProductCard';
import BreadCrumbs from '@/components/shared/BreadCrumbs';
import { Data } from '@/data';
import { useFetchProducts } from '@/features/product/hooks';

export const ProductPage = () => {
    const { data, isLoading } = useFetchProducts();

    if ( isLoading ) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <BreadCrumbs />
            <div className="p-10 flex gap-10 max-w-7xl w-full">
                <SideBar />
                <div className="grid gap-5 grid-cols-3">
                    { data.slice( 0, 9 ).map( ( product ) => (
                        <ProductCard { ...product } /> ) ) }
                </div>
            </div>
        </div>
    );
};
