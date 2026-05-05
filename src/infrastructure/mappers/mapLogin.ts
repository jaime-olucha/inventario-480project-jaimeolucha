import type { LoginResponseDTO } from "@/infrastructure/dtos/Login/LoginResponseDTO";
import type { LoginResponse } from "../../domain/models/Login/LoginResponse";
import { mapUser } from "./mapUser";
import type { LoginRequestDTO } from "@/infrastructure/dtos/Login/LoginRequestDTO";
import type { LoginRequest } from "../../domain/models/Login/LoginRequest";

export const mapLoginResponse = (dto: LoginResponseDTO): LoginResponse => ({
  token: dto.token,
  user: mapUser(dto.user)
});


export const mapLoginRequest = (dto: LoginRequestDTO): LoginRequest => ({
  email: dto.email,
  password: dto.password
})