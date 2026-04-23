import { create } from "zustand";
import type { AuthState } from "./interface/AuthState";

const STORAGE_KEY = 'token'

export const useAuthStore = create<AuthState>((set) => ({

    token: sessionStorage.getItem(STORAGE_KEY),
    isAuthenticated: !!sessionStorage.getItem(STORAGE_KEY),

    setToken: (token) => {
        sessionStorage.setItem(STORAGE_KEY, token);

        set({
            token,
            isAuthenticated: true
        })
    },

    logout: () => {
        sessionStorage.removeItem(STORAGE_KEY);

        set({
            token: null,
            isAuthenticated: false
        })
    },

}))