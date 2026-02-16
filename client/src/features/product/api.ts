import { ProductApiSchema, type Product, type ProductFormInput } from "@/schema/product.schema";
import api from "@/utils/axios";
import z from "zod";
// import type { CreateProduct, Product } from "./type";

export const getProducts = async (): Promise<Product[]> => {
    const res = await api.get( "/product" );
    const result = z.array( ProductApiSchema ).safeParse( res.data );
    if ( !result.success ) {
        console.error( 'Zod validation failed:', result.error );
        throw new Error( 'Invalid product data' );
    }
    return result.data;
};

export const getSingleProduct = async ( param: string ): Promise<Product> => {
    const res = await api.get( `/product/id/${ param }` );
    return ProductApiSchema.parse( res.data );
};

export const getProductDetail = async ( param: string ): Promise<Product> => {
    const res = await api.get( `/product/slug/${ param }` );
    return ProductApiSchema.parse( res.data );
};

export const createProduct = async ( formData: FormData ): Promise<Product> => {
    const res = await api.post( `/admin/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    } );
    return ProductApiSchema.parse( res.data );
};

export const updateProduct = async ( formData: FormData, id: string ): Promise<Product> => {
    const res = await api.put( `/admin/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    } );
    return ProductApiSchema.parse( res.data );
};
