import { z } from "zod";

export const ProductSchema = z.object( {
  name: z.string().min( 2 ),
  brand: z.string(),
  price: z.number().positive(),
  discountPrice: z.number().nonnegative().optional(),
  stocks: z.number().int().nonnegative(),
  images: z.array( z.string() ).min( 1 ).max( 5 ),
  screenSize: z.string(),
  cpu: z.string(),
  gpu: z.string().default( "" ),
  ram: z.string(),
  storage: z.string(),
  os: z.string().default( "" ),
  battery: z.string().default( "" ),
} );

export type Product = z.infer<typeof ProductSchema>;
export const ProductIdSchema = z.object( {
  id: z.string().regex( /^[0-9a-fA-F]{24}$/ ),
} );
