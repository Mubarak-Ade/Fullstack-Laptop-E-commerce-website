import { showGlobalToast } from "@/context/ToastContext";
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

    return config

})


api.interceptors.response.use(
    (response) => response,
    (error) => {
        const logout = useAuthStore.getState().logout
        const message =
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            "An unexpected error occurred"
        if (error.response?.status === 401) {
            showGlobalToast("error", message)
            logout()
        }
        console.error("API Error", message)
        return Promise.reject(new Error(message))
    }
)

export default api
