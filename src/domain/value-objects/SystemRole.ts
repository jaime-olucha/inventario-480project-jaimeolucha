export const SYSTEM_ROLES = {
    ADMIN: 'ROLE_ADMIN',
    EMPLOYEE: 'ROLE_EMPLOYEE',
} as const;

export type SystemRole = typeof SYSTEM_ROLES[keyof typeof SYSTEM_ROLES];