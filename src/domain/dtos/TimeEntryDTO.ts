import type { EntityId } from "../value-objects/EntityId";


export interface TimeEntryDTO {
  id: EntityId;
  project_user_id: EntityId;
  date: string;
  hour: number;
  comment?: string;
}