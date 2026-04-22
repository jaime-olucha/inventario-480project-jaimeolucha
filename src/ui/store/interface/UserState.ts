import type { User } from "../../../domain/entities/User";


export interface UserState {
    user: User | null;
    setUser: (user: User) => void
    clearUser: () => void
}