import type { User } from "@/domain/models/User/User";


export interface UserState {
  user: User | null;
  isInitialized: boolean;
  setUser: (user: User) => void;
  setInitialized: () => void;
  clearUser: () => void;
}