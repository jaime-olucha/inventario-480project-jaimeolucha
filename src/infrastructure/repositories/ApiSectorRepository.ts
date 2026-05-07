import type { SectorRepository } from "@/domain/repositories/SectorRepository";
import type { Sector } from "@/domain/models/Client/Sector";
import type { SectorDTO } from "@/infrastructure/dtos/Client/SectorDTO";
import { httpClient } from "../http/httpClient";
import { API_ENDPOINTS } from "../http/types/endpoints";
import { HttpMethod } from "../http/types/HttpMethods";
import { mapSector } from "../mappers/mapClient";

export class ApiSectorRepository implements SectorRepository {
  async getAll(): Promise<Sector[]> {
    const response = await httpClient<SectorDTO[]>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.SECTORS.LIST,
    });
    return response.map(mapSector);
  }
}
