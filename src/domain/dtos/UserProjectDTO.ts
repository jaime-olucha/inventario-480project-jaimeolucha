import type { EntityId } from "../value-objects/EntityId";
import type { ClientDTO } from "./ClientDTO";

export interface UserProjectDTO {
  project_user_id: EntityId;
  id: EntityId;
  name: string;
  description?: string;
  is_active: boolean;
  team_members: number;
  client: ClientDTO;
}