import { showGlobalToast } from '@/context/ToastContext';
import { useAuthStore } from '@/store/AuthStore';
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL as string,
    withCredentials: true,
});

api.interceptors.request.use(config => {
    const identity = useAuthStore.getState().identity;

    if (identity.type === 'user' && identity.user.token) {
        config.headers.Authorization = `Bearer ${identity.user.token}`;
    }

    if (identity.type === 'guest') {
        config.headers['x-guest-id'] = identity.guestId;
    }

    return config;
});

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config as RetryableAxiosRequestConfig | undefined;
        const status = error.response?.status as number | undefined;
        const requestUrl = originalRequest?.url ?? '';
        const isRefreshRequest = requestUrl.includes('/user/refresh');
        const identity = useAuthStore.getState().identity;
        const { logout, setAccessToken } = useAuthStore.getState();

        if (
            status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !isRefreshRequest &&
            identity.type === 'user'
        ) {
            originalRequest._retry = true;
            try {
                const refreshResponse = await api.post('/user/refresh');
                const newToken = refreshResponse.data.token as string;
                setAccessToken(newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api.request(originalRequest);
            } catch {
                logout();
                showGlobalToast('error', 'Session expired. Please log in again.');
                return Promise.reject(new Error('Session expired'));
            }
        }

        const message =
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            'An unexpected error occurred';

        if (status === 401 && identity.type === 'user') {
            logout();
        }

        console.error('API Error', message);
        return Promise.reject(new Error(message));
    }
);

export default api;
