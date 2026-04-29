import { create } from "zustand";
import type { AuthState } from "./interface/AuthState";

const STORAGE_KEY = 'token'

export const useAuthStore = create<AuthState>((set) => ({

    token: localStorage.getItem(STORAGE_KEY),
    isAuthenticated: !!localStorage.getItem(STORAGE_KEY),

    setToken: (token) => {
        localStorage.setItem(STORAGE_KEY, token);

        set({
            token,
            isAuthenticated: true
        })
    },

    logout: () => {
        localStorage.removeItem(STORAGE_KEY);

        set({
            token: null,
            isAuthenticated: false
        })
    },

}))