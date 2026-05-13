import type { SystemRole } from "@/domain/value-objects/SystemRole";

export interface UpdateUserRequest {
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  role: SystemRole;
}
