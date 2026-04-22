import { create } from "zustand";
import type { AuthState } from "./interface/AuthState";

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    isAuthenticated: false,

    setToken: (token) => {
        set({
            token,
            isAuthenticated: true
        })
    },

    logout: () => {
        set({
            token: null,
            isAuthenticated: false
        })
    },

}))