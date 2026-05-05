import type { UserTimeEntry } from "../../domain/models/User/UserTimeEntry";
import type { UserTimeEntryDTO } from "@/infrastructure/dtos/User/UserTimeEntriyDTO";
import type { ProjectTimeEntryDTO } from "@/infrastructure/dtos/Project/ProjectTimeEntryDTO";
import type { ProjectTimeEntry } from "../../domain/models/Project/ProjectTimeEntry";
import type { UserTimeEntriesResponseDTO } from "@/infrastructure/dtos/User/UserTimeEntriesResponseDTO";

export const mapUserTimeEntry = (dto: UserTimeEntryDTO): UserTimeEntry => ({
  id: dto.id,
  date: dto.date,
  hours: dto.hour,
  comment: dto.comment,
  projectId: dto.project.id,
  projectName: dto.project.name
});


export const mapProjectTimeEntry = (dto: ProjectTimeEntryDTO): ProjectTimeEntry => ({
  id: dto.id,
  date: dto.date,
  hours: dto.hour,
  comment: dto.comment,
  name: dto.name,
  surname: dto.surname
});


export const mapUserTimeEntriesResponse = (dto: UserTimeEntriesResponseDTO) => ({
  totalHours: dto.total_hours,
  data: dto.data.map(mapUserTimeEntry),
});