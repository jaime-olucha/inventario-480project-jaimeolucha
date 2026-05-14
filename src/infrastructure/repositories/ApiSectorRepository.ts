import type { SectorRepository } from "@/domain/repositories/SectorRepository";
import type { Sector } from "@/domain/models/Client/Sector";
import type { SectorDTO } from "@/infrastructure/dtos/Client/SectorDTO";
import { httpClient } from "../http/httpClient";
import { API_ENDPOINTS } from "../http/types/endpoints";
import { HttpMethod } from "../http/types/HttpMethods";
import { mapSector } from "../mappers/mapClient";
import { v7 as uuidv7 } from "uuid";
import type { EntityId } from "@/domain/value-objects/EntityId";

export class ApiSectorRepository implements SectorRepository {
  async getAll(): Promise<Sector[]> {
    const response = await httpClient<SectorDTO[]>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.SECTORS.LIST,
    });
    return response.map(mapSector);
  }

  async create(name: string): Promise<void> {
    await httpClient<void, { id: string; name: string }>({
      method: HttpMethod.POST,
      path: API_ENDPOINTS.SECTORS.LIST,
      body: { id: uuidv7(), name },
    });
  }

  async update(id: EntityId, name: string): Promise<void> {
    await httpClient<void, { name: string }>({
      method: HttpMethod.PATCH,
      path: API_ENDPOINTS.SECTORS.BY_ID(id),
      body: { name },
    });
  }

  async delete(id: EntityId): Promise<void> {
    await httpClient<void>({
      method: HttpMethod.DELETE,
      path: API_ENDPOINTS.SECTORS.BY_ID(id),
    });
  }
}
