import z from "zod";

const UserSchema = z.object({
    _id: z.transform(String).optional(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(["user", "admin"]).default("user").optional(),
    isVerified: z.boolean().default(false).optional()
})
export type UserDTO = z.infer<typeof UserSchema>