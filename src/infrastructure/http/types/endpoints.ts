import type { EntityId } from "@/domain/value-objects/EntityId";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `/login`,
    MFA: `/mfa`,
  },

  USERS: {
    LIST: `/users`,
    BY_ID: (id: EntityId) => `/users/${id}`,
    PROJECTS: (id: EntityId) => `/users/${id}/projects`,
    PASSWORD_CHANGE: (id: EntityId) => `/users/${id}/password_change`,
    ADMIN_PASSWORD_CHANGE: (id: EntityId) => `/users/${id}/admin_password`,
    TIME_ENTRIES: (id: EntityId) => `/users/${id}/time-entries`,
  },

  CLIENTS: {
    LIST: `/clients`,
    BY_ID: (id: EntityId) => `/clients/${id}`,
    CONTACTS: (id: EntityId) => `/clients/${id}/contacts`,
    PROJECTS: (id: EntityId) => `/clients/${id}/projects`,
  },

  SECTORS: {
    LIST: `/sectors`,
  },

  TECHNOLOGIES: {
    LIST: `/technologies`,
    CREATE: `/technologies`,
    BY_ID: (id: EntityId) => `/technologies/${id}`,
  },

  PROJECTS: {
    LIST: `/projects`,
    BY_ID: (id: EntityId) => `/projects/${id}`,
    USERS: (id: EntityId) => `/projects/${id}/users`,
    DEVELOPMENTS: (id: EntityId) => `/projects/${id}/developments`,
    TIME_ENTRIES: (id: EntityId) => `/projects/${id}/time-entries`,
    TIME_ENTRY_BY_ID: (projectId: EntityId, entryId: EntityId) => `/projects/${projectId}/time-entries/${entryId}`,
  },

} as const;
