import type { LoginRequest } from "../models/Login/LoginRequest";
import type { LoginResponse } from "../models/Login/LoginResponse";

export interface AuthRepository {
  login(data: LoginRequest): Promise<LoginResponse>;
  logout(): Promise<void>;
}
