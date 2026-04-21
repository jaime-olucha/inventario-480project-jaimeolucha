import type { User } from "../entities/User";


export interface LoginResponseDTO {
    token: string;
    user: User;
} 