import type { EntityId } from "../value-objects/EntityId";

export interface UserProjectDTO {
  project_user_id: EntityId;
  id: EntityId;
  name: string;
  description?: string;
  is_active: boolean;
  team_members: number;
  client: {
    id: EntityId;
    name: string;
  }
}


