import type { UserDTO } from "@/infrastructure/dtos/User/UserDTO";
import type { User } from "../../domain/models/User/User";

export const mapUser = (dto: UserDTO): User => ({
  id: dto.id,
  name: dto.name,
  surname: dto.surname,
  email: dto.email,
  role: dto.role,
  isActive: dto.is_active,
});