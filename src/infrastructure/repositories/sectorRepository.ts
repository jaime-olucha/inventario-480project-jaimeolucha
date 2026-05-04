import { httpClient } from "../http/httpClient";
import { API_ENDPOINTS } from "../http/types/endpoints";
import { HttpMethod } from "../http/types/HttpMethods";
import type { SectorDTO } from "@/domain/dtos/SectorDTO";
import type { Sector } from "../models/Sector";
import { mapSector } from "../mappers/mapSector";

export const getSectorsApi = async (): Promise<Sector[]> => {
  const response = await httpClient<SectorDTO[]>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.SECTORS.LIST,
  });

  return response.map(mapSector);
};
