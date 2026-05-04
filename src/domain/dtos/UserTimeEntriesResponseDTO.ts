import type { UserTimeEntryDTO } from "./UserTimeEntriyDTO";

export interface UserTimeEntriesResponseDTO {
  total_hours: number;
  data: UserTimeEntryDTO[];
}