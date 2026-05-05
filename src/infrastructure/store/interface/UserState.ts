import type { User } from "../../dtos/User/UserDTO";


export interface UserState {
  user: User | null;
  setUser: (user: User) => void
  clearUser: () => void
}