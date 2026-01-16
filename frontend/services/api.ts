import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { API_URL, AUTH } from "@/constants";

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get(AUTH.ACCESS_TOKEN_KEY);
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = Cookies.get(AUTH.REFRESH_TOKEN_KEY);
                if (refreshToken) {
                    const response = await axios.post(`${API_URL}/oauth/refresh`, {
                        refresh_token: refreshToken,
                    });

                    const { access_token, expires_in } = response.data;
                    Cookies.set(AUTH.ACCESS_TOKEN_KEY, access_token, {
                        expires: new Date(expires_in * 1000),
                    });

                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${access_token}`;
                    }
                    return api(originalRequest);
                }
            } catch {
                Cookies.remove(AUTH.ACCESS_TOKEN_KEY);
                Cookies.remove(AUTH.REFRESH_TOKEN_KEY);
                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;
