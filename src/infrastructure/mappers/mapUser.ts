import type { UserDTO } from "@/domain/dtos/UserDTO";
import type { User } from "../models/User";

export const mapUser = (dto: UserDTO): User => ({
  id: dto.id,
  name: dto.name,
  surname: dto.surname,
  email: dto.email,
  role: dto.role,
  isActive: dto.is_active,
});