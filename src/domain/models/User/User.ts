import type { EntityId } from "@/domain/value-objects/EntityId";
import type { SystemRole } from "@/domain/value-objects/SystemRole";


export interface User {
  id: EntityId;
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  role: SystemRole;
}