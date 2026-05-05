import type { TimeEntryDTO } from "../User/TimeEntryDTO";


export interface ProjectTimeEntryDTO extends TimeEntryDTO {
  name: string;
  surname: string
}