import type { EntityId } from "@/domain/value-objects/EntityId";
import type { TimeEntry } from "./TimeEntry";

export interface UserTimeEntry extends TimeEntry {
  projectId: EntityId;
  projectName: string;
}