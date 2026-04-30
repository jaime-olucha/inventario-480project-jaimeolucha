import type { EntityId } from "../value-objects/EntityId";
import type { SectorDTO } from "./SectorDTO";

export interface ClientDTO {
  id: EntityId;
  name: string;
  is_active: boolean;
  sector: SectorDTO;
}