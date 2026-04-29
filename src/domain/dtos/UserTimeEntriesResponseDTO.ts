import type { TimeEntry } from "../entities/TimeEntry";


export interface UserTimeEntriesResponseDTO {
  total_hours: number;
  data: TimeEntry[];
}