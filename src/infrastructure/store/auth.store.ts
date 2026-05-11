import { create } from "zustand";
import type { AuthState } from "./interface/AuthState";

const ACCESS_KEY = 'token';
const REFRESH_KEY = 'refresh_token';

export const useAuthStore = create<AuthState>((set) => ({

  token: localStorage.getItem(ACCESS_KEY),
  refreshToken: localStorage.getItem(REFRESH_KEY),
  isAuthenticated: !!localStorage.getItem(ACCESS_KEY),

  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem(ACCESS_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    set({ token: accessToken, refreshToken, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    set({ token: null, refreshToken: null, isAuthenticated: false });
  },

}))
