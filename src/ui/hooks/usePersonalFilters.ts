import type { User } from "@/domain/models/User/User";
import { SYSTEM_ROLES } from "@/domain/value-objects/SystemRole";
import { useState } from "react";
import { useFilters, STATUS_OPTIONS } from "./useFilters";

export { STATUS_OPTIONS };

export const ROLE_OPTIONS = [
  { value: 'all', label: 'Todos los roles' },
  { value: SYSTEM_ROLES.ADMIN, label: 'Rol Administrador' },
  { value: SYSTEM_ROLES.EMPLOYEE, label: 'Sin Rol de administrador' },
] as const;

export const usePersonalFilters = (users: User[]) => {
  const [role, setRole] = useState('all');

  const { search, setSearch, status, setStatus, filtered } = useFilters(
    users,
    (user, query) => user.surname.toLowerCase().includes(query)
  );

  const filteredUsers = filtered.filter(user =>
    role === 'all' ||
    (role === SYSTEM_ROLES.EMPLOYEE && user.role !== SYSTEM_ROLES.ADMIN) ||
    user.role === role
  );

  return { search, setSearch, status, setStatus, role, setRole, filteredUsers };
};
