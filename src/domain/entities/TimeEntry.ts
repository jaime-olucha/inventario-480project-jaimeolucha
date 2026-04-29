import type { EntityId } from "../types/EntityId";
import type { Project } from "./Project";


export interface TimeEntry {
  id: EntityId;
  project_user_id: EntityId;
  date: string;
  hour: number;
  comment?: string;
  project: Project;
}