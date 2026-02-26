import { mutationOptions, queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    createProduct,
    getProductDetail,
    getProducts,
    getSingleProduct,
    updateProduct,
} from './api';
import type { ProductWithFilter, Product } from '@/schema/product.schema';
import type { ProductFilters } from '@/schema/product.schema';

export const useProducts = (query: ProductFilters = {}) => {
    return queryOptions<ProductWithFilter>({
        queryKey: ['products', query],
        queryFn: () => getProducts(query),
    });
};

export const useProduct = (param: string) => {
    return queryOptions<Product>({
        queryKey: ['product', param],
        queryFn: () => getProductDetail(param),
        enabled: !!param,
    });
};

export const useProductId = (param: string) => {
    return queryOptions<Product>({
        queryKey: ['product', param],
        queryFn: () => getSingleProduct(param),
        enabled: !!param,
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

export const useUpdateProduct = (id: string) => {
    const queryClient = useQueryClient();
    return mutationOptions({
        mutationFn: (data: FormData) => updateProduct(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: useProduct(id).queryKey });
        },
    });
};
