import type { EntityId } from "@/domain/types/EntityId";
import { httpClient } from "../http/httpClient";
import type { UserTimeEntriesResponseDTO } from "@/domain/dtos/UserTimeEntriesResponseDTO";
import { HttpMethod } from "../http/types/HttpMethods";
import { API_ENDPOINTS } from "./endpoints";



export const getUserTimeEntriesApi = (userId: EntityId) => {

  return httpClient<UserTimeEntriesResponseDTO>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.USERS.TIME_ENTRIES(userId)
  })
}