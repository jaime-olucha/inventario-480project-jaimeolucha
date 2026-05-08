import { ROUTES } from "@/ui/routes/routes";
import { LayoutDashboard, Folder, Users, Building2 } from "lucide-react";
import type { SidebarItem } from "./interface/SidebarItem";
import { SYSTEM_ROLES } from "@/domain/value-objects/SystemRole";

import { DashboardPage } from "@/ui/pages/DashboardPage/DashboardPage";
import { PersonalPage } from "@/ui/pages/PersonalPage/PersonalPage";
import { ClientPage } from "@/ui/pages/ClientPage/ClientPage";
import { ProjectPage } from "@/ui/pages/ProjectPage/ProjectPage";



export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: "Inicio",
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    roles: [SYSTEM_ROLES.ADMIN, SYSTEM_ROLES.EMPLOYEE],
    page: DashboardPage,
  },
  {
    label: "Personal",
    path: ROUTES.USER.LIST,
    icon: Users,
    roles: [SYSTEM_ROLES.ADMIN],
    page: PersonalPage,
  },
  {
    label: "Clientes",
    path: ROUTES.CLIENTS.LIST,
    icon: Building2,
    roles: [SYSTEM_ROLES.ADMIN],
    page: ClientPage,
  },
  {
    label: "Proyectos",
    path: ROUTES.PROJECTS.LIST,
    icon: Folder,
    roles: [SYSTEM_ROLES.ADMIN, SYSTEM_ROLES.EMPLOYEE],
    page: ProjectPage,
  },
];
