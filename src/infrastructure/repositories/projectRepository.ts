import { httpClient } from "../http/httpClient";
import { API_ENDPOINTS } from "../http/types/endpoints";
import { HttpMethod } from "../http/types/HttpMethods";
import type { EntityId } from "@/domain/value-objects/EntityId";
import type { ProjectListItemDTO } from "@/domain/dtos/ProjectListItemDTO";
import type { ProjectDetailDTO } from "@/domain/dtos/ProjectDetailDTO";
import type { ProjectUserDTO } from "@/domain/dtos/ProjectUserDTO";
import type { DevelopmentDTO } from "@/domain/dtos/DevelopmentDTO";
import type { ProjectTimeEntryDTO } from "@/domain/dtos/ProjectTimeEntryDTO";
import type { ProjectListItem } from "../models/ProjectListItem";
import type { ProjectDetail } from "../models/ProjectDetail";
import type { ProjectUser } from "../models/ProjectUser";
import type { Development } from "../models/Development";
import type { ProjectTimeEntry } from "../models/ProjectTimeEntry";
import { mapProjectListItem, mapProjectDetail, mapProjectUser } from "../mappers/mapProject";
import { mapDevelopment } from "../mappers/mapDevelopment";
import { mapProjectTimeEntry } from "../mappers/mapTimeEntry";

export const getProjectsApi = async (): Promise<ProjectListItem[]> => {
  const response = await httpClient<ProjectListItemDTO[]>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.PROJECTS.LIST,
  });
  return response.map(mapProjectListItem);
};

export const getProjectByIdApi = async (id: EntityId): Promise<ProjectDetail> => {
  const response = await httpClient<ProjectDetailDTO>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.PROJECTS.BY_ID(id),
  });
  return mapProjectDetail(response);
};

export const getProjectUsersApi = async (id: EntityId): Promise<ProjectUser[]> => {
  const response = await httpClient<ProjectUserDTO[]>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.PROJECTS.USERS(id),
  });
  return response.map(mapProjectUser);
};

export const getProjectDevelopmentsApi = async (id: EntityId): Promise<Development[]> => {
  const response = await httpClient<DevelopmentDTO[]>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.PROJECTS.DEVELOPMENTS(id),
  });
  return response.map(mapDevelopment);
};

export const getProjectTimeEntriesApi = async (id: EntityId): Promise<ProjectTimeEntry[]> => {
  const response = await httpClient<ProjectTimeEntryDTO[]>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.PROJECTS.TIME_ENTRIES(id),
  });
  return response.map(mapProjectTimeEntry);
};

export const getProjectTimeEntryByIdApi = async (projectId: EntityId, entryId: EntityId): Promise<ProjectTimeEntry> => {
  const response = await httpClient<ProjectTimeEntryDTO>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.PROJECTS.TIME_ENTRY_BY_ID(projectId, entryId),
  });
  return mapProjectTimeEntry(response);
};
