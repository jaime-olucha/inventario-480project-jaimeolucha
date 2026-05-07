import type { AuthRepository } from "@/domain/repositories/AuthRepository";
import type { LoginRequest } from "@/domain/models/Login/LoginRequest";
import type { LoginResponse } from "@/domain/models/Login/LoginResponse";
import type { LoginRequestDTO } from "@/infrastructure/dtos/Login/LoginRequestDTO";
import type { LoginResponseDTO } from "@/infrastructure/dtos/Login/LoginResponseDTO";
import { httpClient } from "../http/httpClient";
import { API_ENDPOINTS } from "../http/types/endpoints";
import { HttpMethod } from "../http/types/HttpMethods";
import { mapLoginResponse } from "../mappers/mapLogin";

export class ApiAuthRepository implements AuthRepository {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const dto = await httpClient<LoginResponseDTO, LoginRequestDTO>({
      method: HttpMethod.POST,
      path: API_ENDPOINTS.AUTH.LOGIN,
      body: data,
    });
    return mapLoginResponse(dto);
  }

  async logout(): Promise<void> {
    return httpClient<void>({
      method: HttpMethod.POST,
      path: API_ENDPOINTS.AUTH.LOGOUT,
    });
  }
}
