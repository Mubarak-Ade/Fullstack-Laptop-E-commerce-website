import z from 'zod';
import { ProductApiSchema } from './product.schema';

export const ShippingSchema = z.object({
    firstname: z.string().min(3, 'firstname is required'),
    lastname: z.string().min(3, 'lastname is required'),
    phone: z.string().min(9, 'phone number is required'),
    email: z.string().email(),
    state: z.string().min(3, 'state is required'),
    address: z.string().min(3, 'address is required'),
    city: z.string().min(3, 'city is required'),
    postalCode: z.string().min(3, 'postal code is required'),
    country: z.string().min(3, 'country is required'),
    shippingMethod: z.string(),
});

export const OrderSchema = z.object({
    _id: z.string(),
    subTotal: z.number(),
    shippingFee: z.number(),
    total: z.number(),
    tax: z.number(),
    products: z.object({
        productId: z.string(),
        productName: z.string(),
        quantity: z.number(),
        image: z.string(),
        unitPriceAtPurchase: z.number(),
    }),
    status: z.enum(['PENDING_PAYMENT', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED']),
    updatedAt: z.string(),
    shippingAddress: ShippingSchema.omit({ firstname: true, lastname: true }).extend({
        fullName: z.string(),
    }),
});

export type Order = z.infer<typeof OrderSchema>;

export type ShippingInput = z.infer<typeof ShippingSchema>;
