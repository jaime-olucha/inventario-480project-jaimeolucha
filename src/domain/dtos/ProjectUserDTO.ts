import type { EntityId } from "../value-objects/EntityId";
import type { ProjectRoleDTO } from "./ProjectRoleDTO";


export interface ProjectUserDTO {
  app_user_id: EntityId;
  name: string;
  surname: string;
  role: ProjectRoleDTO;
}