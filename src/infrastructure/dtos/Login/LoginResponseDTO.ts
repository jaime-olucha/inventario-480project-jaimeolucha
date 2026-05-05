import type { UserDTO } from "../User/UserDTO";


export interface LoginResponseDTO {
  token: string;
  user: UserDTO;
} 