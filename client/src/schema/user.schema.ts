import z from 'zod';

const UserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    fullname: z.string(),
    token: z.string(),
    role: z.string(),
    avatar: z.string().optional(),
});

export const ProfileSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string(),
    avatar: z.custom<any>(),
    bio: z.string(),
    isVerified: z.boolean(),
});

export const AuthSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type Profile = z.infer<typeof ProfileSchema>;
export type User = z.infer<typeof UserSchema>;
export type AuthInput = z.infer<typeof AuthSchema>;
