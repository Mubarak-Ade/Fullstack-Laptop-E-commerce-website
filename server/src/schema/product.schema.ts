import { z } from "zod";

/* ---------------- SPECS ---------------- */

export const SpecsSchema = z.object( {
  screenSize: z.string(),
  cpu: z.string(),
  gpu: z.string(),
  ram: z.string(),
  storage: z.string(),
  os: z.string(),
  battery: z.string(),
} );

/* ---------------- PRODUCT ---------------- */

export const ProductSchema = z.object( {
  name: z.string().min( 2 ),
  brand: z.string(),

  price: z.number(),
  discountPrice: z.number(),

  stocks: z.number().int().nonnegative(),
  rating: z.number().min( 0 ).max( 5 ).optional(),
  numReviews: z.number().int().nonnegative().optional(),

  images: z.array( z.string() ).min( 1 ),
  specs: SpecsSchema,
} );

export type Product = z.infer<typeof ProductSchema>;
export type Specs = z.infer<typeof SpecsSchema>;

export const ProductIdSchema = z.object( {
  id: z.string().regex( /^[0-9a-fA-F]{24}$/ ),
} );
