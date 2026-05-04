import type { EntityId } from "../value-objects/EntityId";

export interface ClientDTO {
  id: EntityId;
  name: string;
  is_active: boolean;
  sector: {
    id: EntityId;
    name: string;
  }
}