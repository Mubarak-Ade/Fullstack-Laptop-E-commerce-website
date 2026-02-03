import type { LoginInput, User } from "@/schema/user.schema";
import api from "@/utils/axios";


export const login = async (data: LoginInput) : Promise<User> => {
    const res = await api.post("/user/login", {...data})
    return res.data
}