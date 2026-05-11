import type { LoginResponseDTO } from "@/infrastructure/dtos/Login/LoginResponseDTO";
import type { LoginResponse } from "../../domain/models/Login/LoginResponse";

export const mapLoginResponse = (dto: LoginResponseDTO): LoginResponse => ({
  token: dto.token,
  refreshToken: dto.refresh_token,
});
