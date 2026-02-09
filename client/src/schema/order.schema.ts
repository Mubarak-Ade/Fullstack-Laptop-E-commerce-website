import z from "zod";

export const OrderSchema = z.object({
    firstname: z.string().min(3, "firstname is required"),
    lastname: z.string().min(3, "lastname is required"),
    phone: z.string().min(9, "phone number is required"),
    email: z.string().email(),
    state: z.string().min(3, "state is required"),
    address: z.string().min(3, "address is required"),
    city: z.string().min(3, "city is required"),
    postalCode: z.string().min(3, "postal code is required"),
    country: z.string().min(3, "country is required"),
    shippingMethod: z.string(),
})

export type OrderInput = z.infer<typeof OrderSchema>