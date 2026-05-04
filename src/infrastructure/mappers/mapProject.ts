import type { ProjectDetailDTO } from "@/domain/dtos/ProjectDetailDTO";
import type { ProjectDTO } from "@/domain/dtos/ProjectDTO";
import type { ProjectListItemDTO } from "@/domain/dtos/ProjectListItemDTO";
import type { Project } from "../models/Project";
import type { ProjectDetail } from "../models/ProjectDetail";
import type { ProjectListItem } from "../models/ProjectListItem";
import type { ProjectRoleDTO } from "@/domain/dtos/ProjectRoleDTO";
import type { ProjectRole } from "../models/ProjectRole";
import type { ProjectUserDTO } from "@/domain/dtos/ProjectUserDTO";
import type { ProjectUser } from "../models/ProjectUser";


export const mapProject = (dto: ProjectDTO): Project => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  startDate: dto.start_date,
  isActive: dto.is_active,
  clientId: dto.client.id,
  clientName: dto.client.name,
});

export const mapProjectListItem = (dto: ProjectListItemDTO): ProjectListItem => ({
  ...mapProject(dto),
  teamMembers: dto.team_members,
});

export const mapProjectDetail = (dto: ProjectDetailDTO): ProjectDetail => ({
  ...mapProject(dto),
  editable: dto.editable,
});

export const mapProjectRole = (dto: ProjectRoleDTO): ProjectRole => ({
  id: dto.id,
  name: dto.name,
})

export const mapProjectUser = (dto: ProjectUserDTO): ProjectUser => ({
  userId: dto.app_user_id,
  name: dto.name,
  surname: dto.surname,
  role: mapProjectRole(dto.role),
})