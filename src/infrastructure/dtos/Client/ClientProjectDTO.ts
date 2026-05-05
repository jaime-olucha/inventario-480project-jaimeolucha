import type { EntityId } from "../../../domain/value-objects/EntityId";

export interface ClientProjectDTO {
  id: EntityId;
  name: string;
  description?: string;
  start_date: string
  is_active: boolean;
  team_members: number;
}