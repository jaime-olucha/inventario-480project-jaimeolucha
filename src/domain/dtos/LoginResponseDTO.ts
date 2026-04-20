import type { User } from "../entities/User";


export interface LoginResponseDTO {
    accessToken: string;
    user: User;
} 