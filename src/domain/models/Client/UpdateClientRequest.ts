import type { EntityId } from "@/domain/value-objects/EntityId";

export interface UpdateClientRequest {
  name: string;
  isActive: boolean;
  sectorId: EntityId;
}
