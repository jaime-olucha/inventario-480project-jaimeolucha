import { httpClient } from "../http/httpClient";
import type { User } from "../../domain/entities/User";
import type { EntityId } from "../../domain/types/EntityId";
import { API_ENDPOINTS } from "./endpoints";
import { HttpMethod } from "../http/types/HttpMethods";


export const getUserByIdApi = (id: EntityId, token: string) => {

    return httpClient<User>({
        method: HttpMethod.GET,
        path: API_ENDPOINTS.USERS.BY_ID(id),
        token,
    })
}