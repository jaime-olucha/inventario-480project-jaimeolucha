import type { EntityId } from "../value-objects/EntityId";
import type { SystemRole } from "../value-objects/SystemRole";

export interface UserDTO {
  id: EntityId;
  name: string;
  surname: string;
  email: string;
  is_active: boolean;
  role: SystemRole;
}