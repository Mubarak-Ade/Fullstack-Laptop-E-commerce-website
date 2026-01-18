import { z } from "zod";


/* ---------------- PRODUCT ---------------- */

export const ProductSchema = z.object( {
  name: z.string().min(2, "Product name is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.string().min(1, "Price is required"),
  discountPrice: z.string().optional(),
  stocks: z.string().min(1, "Stock quantity is required"),
  cpu: z.string().min(1, "CPU is required"),
  ram: z.string().min(1, "RAM is required"),
  storage: z.string().min(1, "Storage is required"),
  screenSize: z.string().min(1, "Screen size is required"),
  gpu: z.string().optional(),
  os: z.string().optional(),
  battery: z.string().optional(),
  images: z.any().refine(
    (files) => files?.length >= 1 && files?.length <= 5,
    "Please upload 1-5 images"
  ),
} );

export type Product = z.infer<typeof ProductSchema>;
