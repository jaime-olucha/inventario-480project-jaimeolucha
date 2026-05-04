
import type { UserProjectDTO } from "@/domain/dtos/UserProjectDTO";
import type { UserProject } from "../models/UserProject";

export const mapUserProject = (dto: UserProjectDTO): UserProject => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  isActive: dto.is_active,
  teamMembers: dto.team_members,
  clientId: dto.client.id,
  clientName: dto.client.name,
});
