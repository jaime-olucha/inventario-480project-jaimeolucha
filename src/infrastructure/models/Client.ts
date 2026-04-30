import type { EntityId } from "@/domain/value-objects/EntityId";
import type { Sector } from "./Sector";

export interface Client {
  id: EntityId;
  name: string;
  isActive: boolean;
  sector: Sector;
}