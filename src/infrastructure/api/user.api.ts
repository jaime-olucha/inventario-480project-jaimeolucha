import { httpClient } from "../http/httpClient";
import type { User } from "../../domain/entities/User";
import type { EntityId } from "../../domain/types/EntityId";


export const getUserByIdApi = (id: EntityId, token: string) => {

    return httpClient<User>({
        method: 'GET',
        path: `/user/${id}`,
        token,
    })
}

