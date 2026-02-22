import z from "zod";
export const OrderSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    phone: z.string(),
    email: z.string().email(),
    state: z.string(),
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
    shippingMethod: z.string(),
});
