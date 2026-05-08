import type { EntityId } from "@/domain/value-objects/EntityId";

export interface CreateClientRequest {
  name: string;
  sectorId: EntityId;
}
