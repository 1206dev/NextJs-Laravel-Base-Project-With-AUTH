import api from "./api";
import Cookies from "js-cookie";
import { AUTH } from "@/constants";

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
}

export interface User {
    id: number;
    username: string;
    email?: string;
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>("/oauth/login", credentials);
        const { access_token, expires_in, refresh_token } = response.data;

        Cookies.set(AUTH.ACCESS_TOKEN_KEY, access_token, {
            expires: new Date(expires_in * 1000),
        });
        Cookies.set(AUTH.REFRESH_TOKEN_KEY, refresh_token, {
            expires: AUTH.TOKEN_EXPIRES_DAYS,
        });

        return response.data;
    },

    async logout(): Promise<void> {
        try {
            await api.post("/oauth/logout");
        } finally {
            Cookies.remove(AUTH.ACCESS_TOKEN_KEY);
            Cookies.remove(AUTH.REFRESH_TOKEN_KEY);
        }
    },

    async refresh(): Promise<AuthResponse> {
        const refreshToken = Cookies.get(AUTH.REFRESH_TOKEN_KEY);
        const response = await api.post<AuthResponse>("/oauth/refresh", {
            refresh_token: refreshToken,
        });
        const { access_token, expires_in } = response.data;

        Cookies.set(AUTH.ACCESS_TOKEN_KEY, access_token, {
            expires: new Date(expires_in * 1000),
        });

        return response.data;
    },

    isAuthenticated(): boolean {
        return !!Cookies.get(AUTH.ACCESS_TOKEN_KEY);
    },

    getAccessToken(): string | undefined {
        return Cookies.get(AUTH.ACCESS_TOKEN_KEY);
    },
};

export default authService;
