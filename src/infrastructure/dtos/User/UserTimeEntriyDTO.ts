import type { EntityId } from "../../../domain/value-objects/EntityId";
import type { TimeEntryDTO } from "./TimeEntryDTO";

export interface UserTimeEntryDTO extends TimeEntryDTO {
  project: {
    id: EntityId;
    name: string;
  };
}