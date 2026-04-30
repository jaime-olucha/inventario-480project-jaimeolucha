import type { ProjectDTO } from "./ProjectDTO";
import type { TimeEntryDTO } from "./TimeEntryDTO";

export interface UserTimeEntryDTO extends TimeEntryDTO {
  project: ProjectDTO
}