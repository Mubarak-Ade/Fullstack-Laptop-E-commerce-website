import {
    ProductApiSchema,
    type ProductWithFilter,
    type Product,
    type ProductFilters,
} from '@/schema/product.schema';
import api from '@/utils/axios';
// import type { CreateProduct, Product } from "./type";

export const getProducts = async (filter: ProductFilters): Promise<ProductWithFilter> => {
    const params = new URLSearchParams();

    Object.entries(filter).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (Array.isArray(value)) {
            value.forEach((item) => {
                if (item !== undefined && item !== null && item !== '') {
                    params.append(key, String(item));
                }
            });
            return;
        }
        if (typeof value === 'string' && value.trim() === '') return;
        params.append(key, String(value));
    });

    const res = await api.get('/product', { params });
    // const result = FilterProductSchema.safeParse(res.data);
    // if (!result.success) {
    //     console.error('Zod validation failed:', result.error);
    //     throw new Error('Invalid product data');
    // }
    return res.data;
};

export const getSingleProduct = async (param: string): Promise<Product> => {
    const res = await api.get(`/product/id/${param}`);
    // return ProductApiSchema.parse(res.data);
    return res.data;
};

export const getProductDetail = async (param: string): Promise<Product> => {
    const res = await api.get(`/product/slug/${param}`);
    return ProductApiSchema.parse(res.data);
};

export const createProduct = async (formData: FormData): Promise<Product> => {
    const res = await api.post(`/admin/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return ProductApiSchema.parse(res.data?.product ?? res.data);
};

export const updateProduct = async (formData: FormData, id: string): Promise<Product> => {
    const res = await api.put(`/admin/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return ProductApiSchema.parse(res.data?.product ?? res.data);
};
