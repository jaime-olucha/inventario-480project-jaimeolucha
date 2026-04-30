import type { EntityId } from "@/domain/value-objects/EntityId";
import { httpClient } from "../http/httpClient";
import type { UserTimeEntriesResponseDTO } from "@/domain/dtos/UserTimeEntriesResponseDTO";
import { HttpMethod } from "../http/types/HttpMethods";
import { API_ENDPOINTS } from "../http/types/endpoints";



export const getUserTimeEntriesApi = (userId: EntityId) => {

  return httpClient<UserTimeEntriesResponseDTO>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.USERS.TIME_ENTRIES(userId)
  })
}