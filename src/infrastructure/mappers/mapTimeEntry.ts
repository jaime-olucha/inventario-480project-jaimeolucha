import type { UserTimeEntry } from "../models/UserTimeEntry";
import type { UserTimeEntryDTO } from "@/domain/dtos/UserTimeEntriyDTO";
import { mapProject } from "./mapProject";
import type { ProjectTimeEntryDTO } from "@/domain/dtos/ProjectTimeEntryDTO";
import type { ProjectTimeEntry } from "../models/ProjectTimeEntry";
import type { UserTimeEntriesResponseDTO } from "@/domain/dtos/UserTimeEntriesResponseDTO";

export const mapUserTimeEntry = (dto: UserTimeEntryDTO): UserTimeEntry => ({
  id: dto.id,
  date: dto.date,
  hours: dto.hour,
  comment: dto.comment,
  project: mapProject(dto.project)
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