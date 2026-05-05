import type { TimeEntry } from "../User/TimeEntry";

export interface ProjectTimeEntry extends TimeEntry {
  name: string;
  surname: string;
}
