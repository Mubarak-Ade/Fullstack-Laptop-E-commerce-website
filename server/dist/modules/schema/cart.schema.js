import z from 'zod';
export const CartItemSchema = z.object({
    productId: z.string(),
    quantity: z.number(),
    price: z.number(),
    guestId: z.string().optional()
});
export const CartSchema = z.object({
    user: z.string().optional(),
    items: CartItemSchema,
    totalPrice: z.number(),
    totalItems: z.number(),
    status: z.enum(['active', 'completed', 'cancelled']).default("active"),
});
