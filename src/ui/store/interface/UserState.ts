import type { User } from "../../../domain/dtos/UserDTO";


export interface UserState {
  user: User | null;
  setUser: (user: User) => void
  clearUser: () => void
}