import type { SectorDTO } from "@/domain/dtos/SectorDTO";
import type { Sector } from "../models/Sector";

export const mapSector = (dto: SectorDTO): Sector => ({
  id: dto.id,
  name: dto.name,
});
