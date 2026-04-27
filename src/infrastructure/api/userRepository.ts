import { httpClient } from "../http/httpClient";
import type { User } from "../../domain/entities/User";
import type { EntityId } from "../../domain/types/EntityId";
import { API_ENDPOINTS } from "./endpoints";
import { HttpMethod } from "../http/types/HttpMethods";
import type { UserProjects } from "../../domain/entities/UserProjects";


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