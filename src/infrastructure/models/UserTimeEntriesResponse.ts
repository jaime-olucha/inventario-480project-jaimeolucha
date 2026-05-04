import type { UserTimeEntry } from "./UserTimeEntry";

export interface UserTimeEntriesResponse {
  totalHours: number;
  data: UserTimeEntry[];
}