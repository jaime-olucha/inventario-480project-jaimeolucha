export const PROJECT_ROLES = {
  PROJECT_MANAGER: "PROJECT_MANAGER",
  KAM: "KAM",
} as const;

export type ProjectRoleName = typeof PROJECT_ROLES[keyof typeof PROJECT_ROLES];

const ROLE_LABELS: Record<string, string> = {
  PROJECT_MANAGER: "Project Manager",
  KAM: "KAM",
  DEVELOPER: "Developer",
  DESIGNER: "Designer",
  QA: "QA",
  CONSULTANT: "Consultor",
};

export function getProjectRoleLabel(roleName: string): string {
  return ROLE_LABELS[roleName] ?? roleName.replaceAll("_", " ");
}
