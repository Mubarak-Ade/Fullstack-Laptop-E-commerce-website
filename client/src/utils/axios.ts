import { useAuthStore } from "@/store/AuthStore";
import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL as string
})

api.interceptors.request.use((config) => {
    const identity = useAuthStore.getState().identity
    
    if (identity.type === "user" && identity.user.token) {
        config.headers.Authorization = `Bearer ${identity.user.token}`
    }
    
    if (identity.type === "guest") {
        config.headers['x-guest-id'] = identity.guestId
    }

    console.log(config);
    

    return config

})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.error || error.error || "An unexpected error occured"
        console.error("API Error", message)
        throw new Error(message)
    }
)

export default api