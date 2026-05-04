import type { LoginResponseDTO } from "@/domain/dtos/LoginResponseDTO";
import type { LoginResponse } from "../models/LoginResponse";
import { mapUser } from "./mapUser";
import type { LoginRequestDTO } from "@/domain/dtos/LoginRequestDTO";
import type { LoginRequest } from "../models/LoginRequest";

export const mapLoginResponse = (dto: LoginResponseDTO): LoginResponse => ({
  token: dto.token,
  user: mapUser(dto.user)
});


export const mapLoginRequest = (dto: LoginRequestDTO): LoginRequest => ({
  email: dto.email,
  password: dto.password
})