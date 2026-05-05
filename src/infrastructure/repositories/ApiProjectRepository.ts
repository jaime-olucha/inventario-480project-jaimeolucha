import type { ProjectRepository } from "@/domain/repositories/ProjectRepository";
import type { EntityId } from "@/domain/value-objects/EntityId";
import type { ProjectListItem } from "@/domain/models/Project/ProjectListItem";
import type { ProjectDetail } from "@/domain/models/Project/ProjectDetail";
import type { ProjectUser } from "@/domain/models/Project/ProjectUser";
import type { Development } from "@/domain/models/Project/Development";
import type { ProjectTimeEntry } from "@/domain/models/Project/ProjectTimeEntry";
import type { ProjectListItemDTO } from "@/infrastructure/dtos/Project/ProjectListItemDTO";
import type { ProjectDetailDTO } from "@/infrastructure/dtos/Project/ProjectDetailDTO";
import type { ProjectUserDTO } from "@/infrastructure/dtos/Project/ProjectUserDTO";
import type { DevelopmentDTO } from "@/infrastructure/dtos/Project/DevelopmentDTO";
import type { ProjectTimeEntryDTO } from "@/infrastructure/dtos/Project/ProjectTimeEntryDTO";
import { httpClient } from "../http/httpClient";
import { API_ENDPOINTS } from "../http/types/endpoints";
import { HttpMethod } from "../http/types/HttpMethods";
import { mapProjectListItem, mapProjectDetail, mapProjectUser } from "../mappers/mapProject";
import { mapDevelopment } from "../mappers/mapDevelopment";
import { mapProjectTimeEntry } from "../mappers/mapTimeEntry";

export class ApiProjectRepository implements ProjectRepository {

  async getAll(): Promise<ProjectListItem[]> {
    const response = await httpClient<ProjectListItemDTO[]>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.PROJECTS.LIST,
    });
    return response.map(mapProjectListItem);
  }

  async getById(id: EntityId): Promise<ProjectDetail> {
    const response = await httpClient<ProjectDetailDTO>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.PROJECTS.BY_ID(id),
    });
    return mapProjectDetail(response);
  }

  async getUsers(id: EntityId): Promise<ProjectUser[]> {
    const response = await httpClient<ProjectUserDTO[]>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.PROJECTS.USERS(id),
    });
    return response.map(mapProjectUser);
  }

  async getDevelopments(id: EntityId): Promise<Development[]> {
    const response = await httpClient<DevelopmentDTO[]>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.PROJECTS.DEVELOPMENTS(id),
    });
    return response.map(mapDevelopment);
  }

  async getTimeEntries(id: EntityId): Promise<ProjectTimeEntry[]> {
    const response = await httpClient<ProjectTimeEntryDTO[]>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.PROJECTS.TIME_ENTRIES(id),
    });
    return response.map(mapProjectTimeEntry);
  }

  async getTimeEntryById(projectId: EntityId, entryId: EntityId): Promise<ProjectTimeEntry> {
    const response = await httpClient<ProjectTimeEntryDTO>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.PROJECTS.TIME_ENTRY_BY_ID(projectId, entryId),
    });
    return mapProjectTimeEntry(response);
  }
}
