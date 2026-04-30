import { httpClient } from "../http/httpClient";
import type { User } from "../../domain/dtos/UserDTO";
import type { EntityId } from "../../domain/value-objects/EntityId";
import { API_ENDPOINTS } from "../http/types/endpoints";
import { HttpMethod } from "../http/types/HttpMethods";
import type { UserProjects } from "../../domain/dtos/UserProjectDTO";


export const getUserByIdApi = (id: EntityId) => {

  return httpClient<User>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.USERS.BY_ID(id),
  })
}

export const getUserProjectsApi = (id: EntityId) => {

  return httpClient<UserProjects[]>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.USERS.PROJECTS(id),
  })
}