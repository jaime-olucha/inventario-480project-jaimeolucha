import type { UserRepository } from "@/domain/repositories/UserRepository";
import type { EntityId } from "@/domain/value-objects/EntityId";
import type { User } from "@/domain/models/User/User";
import type { UserProject } from "@/domain/models/User/UserProject";
import type { UserTimeEntriesResponse } from "@/domain/models/User/UserTimeEntriesResponse";
import type { UserDTO } from "@/infrastructure/dtos/User/UserDTO";
import type { UserProjectDTO } from "@/infrastructure/dtos/User/UserProjectDTO";
import type { UserTimeEntriesResponseDTO } from "@/infrastructure/dtos/User/UserTimeEntriesResponseDTO";
import { httpClient } from "../http/httpClient";
import { API_ENDPOINTS } from "../http/types/endpoints";
import { HttpMethod } from "../http/types/HttpMethods";
import { mapUser } from "../mappers/mapUser";
import { mapUserProject } from "../mappers/mapUserProject";
import { mapUserTimeEntriesResponse } from "../mappers/mapTimeEntry";

export class ApiUserRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    const response = await httpClient<UserDTO[]>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.USERS.LIST,
    });
    return response.map(mapUser);
  }

  async getById(id: EntityId): Promise<User> {
    const response = await httpClient<UserDTO>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.USERS.BY_ID(id),
    });
    return mapUser(response);
  }

  async getProjects(id: EntityId): Promise<UserProject[]> {
    const response = await httpClient<UserProjectDTO[]>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.USERS.PROJECTS(id),
    });
    return response.map(mapUserProject);
  }

  async getTimeEntries(id: EntityId): Promise<UserTimeEntriesResponse> {
    const response = await httpClient<UserTimeEntriesResponseDTO>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.USERS.TIME_ENTRIES(id),
    });
    return mapUserTimeEntriesResponse(response);
  }
}
