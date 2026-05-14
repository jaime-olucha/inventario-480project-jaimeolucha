import type { Sector } from "../models/Client/Sector";
import type { EntityId } from "../value-objects/EntityId";

export interface SectorRepository {
  getAll(): Promise<Sector[]>;
  create(name: string): Promise<void>;
  update(id: EntityId, name: string): Promise<void>;
  delete(id: EntityId): Promise<void>;
}
