import type { EntityId } from "@/domain/value-objects/EntityId";

export interface TimeEntry {
  id: EntityId;
  date: string;
  hours: number;
  comment?: string;
}