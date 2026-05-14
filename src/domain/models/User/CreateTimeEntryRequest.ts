import type { EntityId } from "@/domain/value-objects/EntityId";

export interface CreateTimeEntryRequest {
  projectId: EntityId;
  date: string;
  hours: number;
  comment: string;
}
