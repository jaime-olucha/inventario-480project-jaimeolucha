import type { EntityId } from "@/domain/value-objects/EntityId";

export interface CreateTimeEntryRequestDTO {
  id: EntityId;
  project_id: EntityId;
  date: string;
  hour: number;
  comment: string;
}
