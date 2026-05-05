import type { EntityId } from "../../../domain/value-objects/EntityId";
import type { SystemRole } from "../../../domain/value-objects/SystemRole";

export interface UserDTO {
  id: EntityId;
  name: string;
  surname: string;
  email: string;
  is_active: boolean;
  role: SystemRole;
}