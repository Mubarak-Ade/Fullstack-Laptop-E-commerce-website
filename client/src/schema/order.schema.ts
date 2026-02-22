import { status } from '@/utils/constants';
import z, { number } from 'zod';

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
    orderNumber: z.string(),
    _id: z.string(),
    subTotal: z.number(),
    shippingFee: z.number(),
    total: z.number(),
    tax: z.number(),
    products: z.array(
        z.object({
            productId: z.string(),
            productName: z.string(),
            quantity: z.number(),
            image: z.string(),
            unitPriceAtPurchase: z.number(),
        })
    ),
    status: z.enum(status),
    updatedAt: z.string(),
    createdAt: z.string(),
    shippingAddress: ShippingSchema.omit({ firstname: true, lastname: true }).extend({
        fullName: z.string(),
    }),
});

const filterSchema = z.object({
    limit: z.number().optional(),
    page: z.number().optional(),
    status: z.enum(status).optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    search: z.string().optional(),
    minTotal: z.string().optional(),
    maxTotal: z.string().optional(),
    paymentProvider: z.string().optional(),
});

const filteredOrderSchema = z.object({
    order: z.array(OrderSchema),
    total: number
})

export type Order = z.infer<typeof OrderSchema>;

export type FilteredOrder = z.infer<typeof filteredOrderSchema>

export type Filter = z.infer<typeof filterSchema>;

export type ShippingInput = z.infer<typeof ShippingSchema>;
