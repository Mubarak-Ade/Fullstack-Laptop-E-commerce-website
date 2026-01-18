import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProducts, getSingleProduct } from "./api";
import { Data } from "@/data";
import type { Product } from "@/schema/product.schema";

export const useFetchProducts = () => {
    return useQuery<Product[]>( {
        queryKey: [ "products" ],
        queryFn: getProducts,
        initialData: Data
    } );
};

export const useFetchSingleProduct = (id: string) => {
    return useQuery<Product>({
        queryKey: ["product", id],
        queryFn: getSingleProduct,
        enabled: !!id
    })
}

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation( {
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries( { queryKey: [ "products" ] } );
        }
    } );
};