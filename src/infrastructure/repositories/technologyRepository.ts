import { httpClient } from "../http/httpClient";
import { API_ENDPOINTS } from "../http/types/endpoints";
import { HttpMethod } from "../http/types/HttpMethods";
import type { EntityId } from "@/domain/value-objects/EntityId";
import type { TechnologyDTO } from "@/domain/dtos/TechnologyDTO";
import type { Technology } from "../models/Technology";
import { mapTechnology } from "../mappers/mapTechnology";

export const getTechnologiesApi = async (): Promise<Technology[]> => {
  const response = await httpClient<TechnologyDTO[]>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.TECHNOLOGIES.LIST,
  });

  return response.map(mapTechnology);
};

export const getTechnologyByIdApi = async (id: EntityId): Promise<Technology> => {
  const response = await httpClient<TechnologyDTO>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.TECHNOLOGIES.BY_ID(id),
  });

  return mapTechnology(response);
};
