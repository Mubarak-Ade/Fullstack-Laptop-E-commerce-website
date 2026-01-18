import { ProductSchema, type Product } from "@/schema/product.schema";
import api from "@/utils/axios";
import z from "zod";
// import type { CreateProduct, Product } from "./type";

export const getProducts = async (): Promise<Product[]> => {
    const res = await api.get( "/product" );
    return z.array( ProductSchema ).parse( res.data );
};

export const getSingleProduct = async (): Promise<Product> => {
    const res = await api.get( "/product" );
    return ProductSchema.parse( res.data );
};

export const createProduct = async ( formData: FormData ): Promise<Product> => {
    const res = await api.post( `/product`, formData, {
        headers: {"Content-Type": "multipart/form-data"}
    } );
    return ProductSchema.parse( res.data );
};