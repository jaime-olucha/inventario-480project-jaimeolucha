import type { UpdateUserRequest } from "@/domain/models/User/UpdateUserRequest";
import type { UpdateUserRequestDTO } from "../dtos/User/UpdateUserRequestDTO";

export const mapUpdateUserRequest = (request: UpdateUserRequest): UpdateUserRequestDTO => ({
  name: request.name,
  surname: request.surname,
  email: request.email,
  is_active: request.isActive,
  role: request.role,
});
