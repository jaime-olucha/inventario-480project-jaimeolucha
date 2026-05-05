import type { EntityId } from "@/domain/value-objects/EntityId";

export interface Client {
  id: EntityId;
  name: string;
  isActive: boolean;
  sectorId: EntityId;
  sectorName: string;
}