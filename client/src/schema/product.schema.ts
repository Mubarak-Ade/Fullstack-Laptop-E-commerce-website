import { z } from 'zod';

/* ---------------- PRODUCT ---------------- */

export const ProductSchema = z
    .object({
        _id: z.string().optional(),
        name: z.string(),
        brand: z.string(),
        price: z.string(),
        discountPrice: z.string().optional(),
        stock: z.string().optional(),
        stocks: z.string().optional(),
        images: z.custom<FileList>().optional(),
        slug: z.string().optional(),
        isActive: z.boolean().optional(),
        ratings: z.number().optional(),
        numReviews: z.number().optional(),

        // Optional fields that might come later
        cpu: z.string().optional(),
        ram: z.string().optional(),
        storage: z.string().optional(),
        screenSize: z.string().optional(),
        gpu: z.string().optional(),
        os: z.string().optional(),
        battery: z.string().optional(),
    })
    .passthrough(); // Allow extra fields without validation

export const ProductApiSchema = z.object({
    _id: z.string(),
    name: z.string(),
    brand: z.string(),

    price: z.number(),
    discountPrice: z.number().optional(),
    stocks: z.number().optional(),

    images: z.array(z.object({ url: z.string(), public_id: z.string() })),

    slug: z.string().optional(),
    isActive: z.boolean(),
    ratings: z.number(),
    numReviews: z.number(),

    cpu: z.string().optional(),
    ram: z.string().optional(),
    storage: z.string().optional(),
    screenSize: z.string().optional(),
    gpu: z.string().optional(),
    os: z.string().optional(),
    battery: z.string().optional(),

    createdAt: z.string(),
    updatedAt: z.string(),

    __v: z.number().optional(),
});

export const FilterSchema = z.object({
    brands: z.array(z.string()).optional(),
    cpu: z.array(z.string()).optional(),
    ram: z.array(z.string()).optional(),
    storage: z.array(z.string()).optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    sort: z.enum(['newest', 'price-low', 'price-high', 'discount']).optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

export const FilterProductSchema = z.object({
    product: z.array(ProductApiSchema),
    limit: z.number(),
    page: z.number(),
    pages: z.number(),
    total: z.number(),
});

export type Product = z.infer<typeof ProductApiSchema>;

export type ProductFilters = z.infer<typeof FilterSchema>;

export type ProductWithFilter = z.infer<typeof FilterProductSchema>;
export type ProductFormInput = z.infer<typeof ProductSchema>;
