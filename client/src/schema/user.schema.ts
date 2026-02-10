import z from "zod";

const UserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    fullname: z.string(),
    token: z.string(),
    role: z.string(),
    avatar: z.string().optional()
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type User = z.infer<typeof UserSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
