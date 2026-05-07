import type { User } from "@/domain/models/User/User";
import { SYSTEM_ROLES } from "@/domain/value-objects/SystemRole";
import { useState } from "react";

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'active', label: 'Solo activos' },
  { value: 'inactive', label: 'Solo inactivos' },
] as const;

export const ROLE_OPTIONS = [
  { value: 'all', label: 'Todos los roles' },
  { value: SYSTEM_ROLES.ADMIN, label: 'Rol Administrador' },
  { value: SYSTEM_ROLES.EMPLOYEE, label: 'Sin Rol de administrador' },
] as const;

export const usePersonalFilters = (users: User[]) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('active');
  const [role, setRole] = useState('all');

  const filteredUsers = users.filter(user => {

    const query = search.toLowerCase();

    const matchesSearch =
      !query ||
      user.name.toLowerCase().includes(query) ||
      user.surname.toLowerCase().includes(query);

    const matchesStatus =
      status === 'all' ||
      (status === 'active' && user.isActive) ||
      (status === 'inactive' && !user.isActive);

    const matchesRole =
      role === 'all' ||
      (role === SYSTEM_ROLES.EMPLOYEE && user.role !== SYSTEM_ROLES.ADMIN) ||
      user.role === role;

    return matchesSearch && matchesStatus && matchesRole;
  });

  return { search, setSearch, status, setStatus, role, setRole, filteredUsers };
};
