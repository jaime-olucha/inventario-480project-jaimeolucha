import type { UserDTO } from "./UserDTO";


export interface LoginResponseDTO {
  token: string;
  user: UserDTO;
} 