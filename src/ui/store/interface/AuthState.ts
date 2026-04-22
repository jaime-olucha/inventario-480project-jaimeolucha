
export interface AuthState {
    token: string | null;
    isAuthenticated: boolean
    setToken: (token: string) => void;
    logout: () => void;
}