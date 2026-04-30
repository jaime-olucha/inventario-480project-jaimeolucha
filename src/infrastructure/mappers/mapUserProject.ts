
import type { UserProjectDTO } from "@/domain/dtos/UserProjectDTO";
import type { UserProject } from "../models/UserProject";
import { mapClient } from "./mapClient";

export const mapUserProject = (api: UserProjectDTO): UserProject => ({
  id: api.id,
  name: api.name,
  description: api.description,
  isActive: api.is_active,
  teamMembers: api.team_members,
  client: mapClient(api.client),
});
