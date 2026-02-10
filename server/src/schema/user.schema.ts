import z from "zod";
import User from "../models/User.js";

const UserSchema = z.object({
    _id: z.transform(String).optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    bio: z.string().optional(),
    email: z.string().email(),
    password: z.string(),
    avatar: z.string().optional(),
    role: z.enum(["user", "admin"]).default("user").optional(),
    isVerified: z.boolean().default(false).optional()
})
export type UserDTO = z.infer<typeof UserSchema>