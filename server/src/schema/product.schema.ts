import { z } from "zod";
import { omit, partial } from "zod/mini";

export const ProductSchema = z.object({
  name: z.string(),
  brand: z.string(),
  price: z.coerce.number(),
  discountPrice: z.coerce.number().optional(),
  stocks: z.coerce.number().optional(),
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
}) // Allow extra fields without validation

export const UpdateProductSchema = z.object({
  name: z.string().optional(),
  brand: z.string().optional(),
  price: z.coerce.number().optional(),
  discountPrice: z.coerce.number().optional(),
  stocks: z.coerce.number().optional(),
  removedImage: z.array(z.string()).optional(),
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
export type Product = z.infer<typeof ProductSchema>;

export type UpdateProductDTO = z.infer<typeof UpdateProductSchema>

export const ProductSlugSchema = z.object( {
  slug: z.string()
} );

export const ProductIdSchema = z.object({
  id: z.string()
})
