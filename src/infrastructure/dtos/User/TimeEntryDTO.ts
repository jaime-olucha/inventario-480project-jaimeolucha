import type { EntityId } from "../../../domain/value-objects/EntityId";


export interface TimeEntryDTO {
  id: EntityId;
  date: string;
  hour: number;
  comment?: string;
}