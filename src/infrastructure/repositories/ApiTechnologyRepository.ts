import type { TechnologyRepository } from "@/domain/repositories/TechnologyRepository";
import type { EntityId } from "@/domain/value-objects/EntityId";
import type { Technology } from "@/domain/models/Project/Technology";
import type { TechnologyDTO } from "@/infrastructure/dtos/Project/TechnologyDTO";
import { httpClient } from "../http/httpClient";
import { API_ENDPOINTS } from "../http/types/endpoints";
import { HttpMethod } from "../http/types/HttpMethods";
import { mapTechnology } from "../mappers/mapDevelopment";

export class ApiTechnologyRepository implements TechnologyRepository {

  async getAll(): Promise<Technology[]> {
    const response = await httpClient<TechnologyDTO[]>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.TECHNOLOGIES.LIST,
    });
    return response.map(mapTechnology);
  }

  async getById(id: EntityId): Promise<Technology> {
    const response = await httpClient<TechnologyDTO>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.TECHNOLOGIES.BY_ID(id),
    });
    return mapTechnology(response);
  }
}
