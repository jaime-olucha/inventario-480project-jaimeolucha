import type { Project } from "./Project";
import type { TimeEntry } from "./TimeEntry";

export interface UserTimeEntry extends TimeEntry {
  project: Project;
}