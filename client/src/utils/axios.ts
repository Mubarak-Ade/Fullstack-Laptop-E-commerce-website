import axios, { type AxiosInstance } from "axios"

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL as string
})

// api.interceptors.request.use((config) => {
//     // 
// })

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message || "An unexpected error occured"
        console.error("API Error", message)
        throw new Error(message)
    }
)

export default api