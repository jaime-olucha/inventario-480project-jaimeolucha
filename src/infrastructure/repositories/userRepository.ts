import { httpClient } from "../http/httpClient";
import { API_ENDPOINTS } from "../http/types/endpoints";
import { HttpMethod } from "../http/types/HttpMethods";
import type { EntityId } from "../../domain/value-objects/EntityId";
import type { UserDTO } from "@/domain/dtos/UserDTO";
import type { UserProjectDTO } from "@/domain/dtos/UserProjectDTO";
import type { UserTimeEntriesResponseDTO } from "@/domain/dtos/UserTimeEntriesResponseDTO";
import type { User } from "../models/User";
import type { UserProject } from "../models/UserProject";
import type { UserTimeEntriesResponse } from "../models/UserTimeEntriesResponse";
import { mapUser } from "../mappers/mapUser";
import { mapUserProject } from "../mappers/mapUserProject";
import { mapUserTimeEntriesResponse } from "../mappers/mapTimeEntry";


export const getUsersApi = async (): Promise<User[]> => {

  const response = await httpClient<UserDTO[]>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.USERS.LIST
  })

  return response.map(mapUser);
}

export const getUserByIdApi = async (id: EntityId): Promise<User> => {

  const response = await httpClient<UserDTO>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.USERS.BY_ID(id),
  })

  return mapUser(response)
}

export const getUserProjectsApi = async (id: EntityId): Promise<UserProject[]> => {
  const response = await httpClient<UserProjectDTO[]>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.USERS.PROJECTS(id),
  })
  return response.map(mapUserProject);
}

export const getUserTimeEntriesApi = async (userId: EntityId): Promise<UserTimeEntriesResponse> => {

  const response = await httpClient<UserTimeEntriesResponseDTO>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.USERS.TIME_ENTRIES(userId)
  })

  return mapUserTimeEntriesResponse(response)
}