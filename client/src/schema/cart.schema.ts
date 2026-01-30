import z from 'zod';
import { ProductSchema } from './product.schema';

export const CartItemSchema = z.object({
    product: ProductSchema.pick({_id: true, name: true, images: true}),
    quantity: z.number(),
    price: z.number(),
});
export const CartSchema = z.object({
    user: z.string().optional(),
    items: z.array(CartItemSchema),
    totalPrice: z.number(),
    totalItems: z.number(),
    status: z.enum(['active', 'completed', 'cancelled']).default("active"),
    createdAt: z.string(),
    udpatedAt: z.string()
});

export type Cart = z.infer<typeof CartSchema>
export type CartItem = z.infer<typeof CartItemSchema>