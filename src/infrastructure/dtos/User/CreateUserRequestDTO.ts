import type { EntityId } from "@/domain/value-objects/EntityId";
import type { SystemRole } from "@/domain/value-objects/SystemRole";

export interface CreateUserRequestDTO {
  id: EntityId;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: SystemRole;
}
