import type { UserRepository } from "@/domain/repositories/UserRepository";
import type { EntityId } from "@/domain/value-objects/EntityId";
import type { User } from "@/domain/models/User/User";
import type { CreateUserRequest } from "@/domain/models/User/CreateUserRequest";
import type { UserProject } from "@/domain/models/User/UserProject";
import type { UserTimeEntriesResponse } from "@/domain/models/User/UserTimeEntriesResponse";
import type { UserDTO } from "@/infrastructure/dtos/User/UserDTO";
import type { CreateUserRequestDTO } from "@/infrastructure/dtos/User/CreateUserRequestDTO";
import type { UserProjectDTO } from "@/infrastructure/dtos/User/UserProjectDTO";
import type { UserTimeEntriesResponseDTO } from "@/infrastructure/dtos/User/UserTimeEntriesResponseDTO";
import { httpClient } from "../http/httpClient";
import { API_ENDPOINTS } from "../http/types/endpoints";
import { HttpMethod } from "../http/types/HttpMethods";
import { mapUser } from "../mappers/mapUser";
import { mapUserProject } from "../mappers/mapUserProject";
import { mapUserTimeEntriesResponse } from "../mappers/mapTimeEntry";
import { v7 as uuidv7 } from "uuid";

export class ApiUserRepository implements UserRepository {
  async getAll(page: number, limit: number): Promise<User[]> {
    const response = await httpClient<UserDTO[]>({
      method: HttpMethod.GET,
      path: `${API_ENDPOINTS.USERS.LIST}?page=${page}&limit=${limit}`,
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

  async createUser(data: CreateUserRequest): Promise<void> {
    const body: CreateUserRequestDTO = { id: uuidv7(), ...data };
    await httpClient<void, CreateUserRequestDTO>({
      method: HttpMethod.POST,
      path: API_ENDPOINTS.USERS.CREATE,
      body,
    });
  }

  async patchActive(id: EntityId, isActive: boolean): Promise<void> {
    await httpClient<void, { is_active: boolean }>({
      method: HttpMethod.PATCH,
      path: API_ENDPOINTS.USERS.BY_ID(id),
      body: { is_active: isActive },
    });
  }

  async deleteUser(id: EntityId): Promise<void> {
    await httpClient<void>({
      method: HttpMethod.DELETE,
      path: API_ENDPOINTS.USERS.BY_ID(id),
    });
  }
}
