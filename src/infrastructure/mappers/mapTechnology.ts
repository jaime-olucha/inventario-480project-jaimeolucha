import type { TechnologyDTO } from "@/domain/dtos/TechnologyDTO";
import type { Technology } from "../models/Technology";

export const mapTechnology = (dto: TechnologyDTO): Technology => ({
  id: dto.id,
  name: dto.name,
});
