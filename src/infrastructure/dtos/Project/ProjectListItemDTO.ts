
import type { ProjectDTO } from "./ProjectDTO";

export interface ProjectListItemDTO extends ProjectDTO {
  team_members: number;
}