import type { SystemRole } from "@/domain/value-objects/SystemRole";

export interface CreateUserRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: SystemRole;
}
