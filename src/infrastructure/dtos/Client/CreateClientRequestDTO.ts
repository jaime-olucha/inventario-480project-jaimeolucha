import type { EntityId } from "@/domain/value-objects/EntityId";

export interface CreateClientRequestDTO {
  id: EntityId
  name: string;
  sector_id: EntityId;
}
