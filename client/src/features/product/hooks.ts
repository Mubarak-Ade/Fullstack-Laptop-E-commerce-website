import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProductDetail, getProducts, getSingleProduct, updateProduct } from "./api";
import { Data } from "@/data";
import type { Product, ProductFormInput } from "@/schema/product.schema";

export const useProducts = () => {
    return queryOptions({
        queryKey: ["products"],
        queryFn: getProducts
    })
}

export const useProduct = (param: string) => {
    return queryOptions<ProductFormInput>({
        queryKey: ["product", param],
        queryFn: () => getProductDetail(param),
        enabled: !!param
    })
}

export const useProductId = (param: string) => {
    return queryOptions<ProductFormInput>({
        queryKey: ["product", param],
        queryFn: () => getSingleProduct(param),
        enabled: !!param
    })
}

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation( {
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries( { queryKey: useProducts().queryKey } );
        }
    } );
};

export const useUpdateProduct = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation( {
        mutationFn: (data: FormData) => updateProduct(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries( { queryKey: useProducts().queryKey } );
            queryClient.invalidateQueries({queryKey: useProduct(id).queryKey})
        }
    } );
};