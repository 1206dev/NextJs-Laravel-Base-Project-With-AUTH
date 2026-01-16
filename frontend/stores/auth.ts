import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService, LoginCredentials, User } from "@/services/auth.service";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: User | null) => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (credentials: LoginCredentials) => {
                set({ isLoading: true, error: null });
                try {
                    await authService.login(credentials);
                    set({
                        isAuthenticated: true,
                        isLoading: false,
                        user: { id: 0, username: credentials.username },
                    });
                } catch (error) {
                    const message =
                        error instanceof Error ? error.message : "Login failed";
                    set({ error: message, isLoading: false });
                    throw error;
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    await authService.logout();
                } finally {
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                }
            },

            setUser: (user: User | null) => {
                set({ user, isAuthenticated: !!user });
            },

            clearError: () => {
                set({ error: null });
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
