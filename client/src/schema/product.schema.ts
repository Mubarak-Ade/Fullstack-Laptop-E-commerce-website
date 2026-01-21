import { z } from "zod";


/* ---------------- PRODUCT ---------------- */

export const ProductSchema = z.object({
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
}).passthrough(); // Allow extra fields without validation

export const ProductApiSchema = z.object({
  _id: z.string(),
  name: z.string(),
  brand: z.string(),

  price: z.number(),
  discountPrice: z.number().optional(),
  stocks: z.number().optional(),

  images: z.array(z.string()),

  slug: z.string().optional(),
  isActive: z.boolean(),
  ratings: z.number(),
  numReviews: z.number(),

  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number().optional(),
});

export type Product = z.infer<typeof ProductApiSchema>;

export type ProductFormInput = z.infer<typeof ProductSchema>;
