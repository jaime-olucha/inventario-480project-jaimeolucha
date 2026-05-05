import { SYSTEM_ROLES, type SystemRole } from "@/domain/value-objects/SystemRole";

export const getRoleBadge = (role?: SystemRole) => {
  if (role === SYSTEM_ROLES.ADMIN) return "Administrador";
}
