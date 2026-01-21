import { ProductApiSchema, ProductSchema, type Product, type ProductFormInput } from "@/schema/product.schema";
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

export const getSingleProduct = async ( param: string ): Promise<ProductFormInput> => {
    const res = await api.get( `/product/${ param }` );
    return  res.data;
};

export const createProduct = async ( formData: FormData ): Promise<Product> => {
    const res = await api.post( `/product`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    } );
    return ProductApiSchema.parse( res.data );
};

export const updateProduct = async ( formData: FormData, id: string ): Promise<Product> => {
    const res = await api.put( `/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    } );
    return ProductApiSchema.parse( res.data );
};