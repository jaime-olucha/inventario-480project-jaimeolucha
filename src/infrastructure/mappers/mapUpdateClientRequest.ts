import type { UpdateClientRequest } from "@/domain/models/Client/UpdateClientRequest";
import type { UpdateClientRequestDTO } from "../dtos/Client/UpdateClientRequestDTO";

export const mapUpdateClientRequest = (request: UpdateClientRequest): UpdateClientRequestDTO => ({
  name: request.name,
  is_active: request.isActive,
  sector_id: request.sectorId,
});
