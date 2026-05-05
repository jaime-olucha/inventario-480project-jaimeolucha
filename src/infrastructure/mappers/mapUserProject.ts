
import type { UserProjectDTO } from "@/infrastructure/dtos/User/UserProjectDTO";
import type { UserProject } from "../../domain/models/User/UserProject";

export const mapUserProject = (dto: UserProjectDTO): UserProject => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  isActive: dto.is_active,
  teamMembers: dto.team_members,
  clientId: dto.client.id,
  clientName: dto.client.name,
});
