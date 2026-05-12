import { create } from "zustand";
import type { UserState } from "./interface/UserState";

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isInitialized: false,

    setUser: (user) => set({ user }),
    setInitialized: () => set({ isInitialized: true }),
    clearUser: () => set({ user: null, isInitialized: false }),
}));