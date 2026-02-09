import { SideBar } from '@/components/layout/SideBar';
import { ProductPageSkeleton } from '@/components/layout/skeleton/ProductPageSkeleton';
import { ProductCard } from '@/components/ProductCard';
import BreadCrumbs from '@/components/shared/BreadCrumbs';
import { useProducts } from '@/features/product/hooks';
import { useQuery } from '@tanstack/react-query';

export const ProductPage = () => {
    const { data: products, isFetching } = useQuery(useProducts());

    if ( isFetching ) {
        return <ProductPageSkeleton />;
    }    

    return (
        <div>
            <BreadCrumbs />
            <div className="p-10 flex gap-10 max-w-7xl w-full">
                <SideBar />
                <div className="grid gap-5 grid-cols-3">
                    { products?.map( ( product ) => (
                        <ProductCard { ...product } key={product._id} /> ) ) }
                </div>
            </div>
        </div>
    );
};
