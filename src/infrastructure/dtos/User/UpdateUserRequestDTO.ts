import type { SystemRole } from "@/domain/value-objects/SystemRole";

export interface UpdateUserRequestDTO {
  name: string;
  surname: string;
  email: string;
  is_active: boolean;
  role: SystemRole;
}
