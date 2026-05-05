import type { EntityId } from "../value-objects/EntityId";
import type { Technology } from "../models/Project/Technology";

export interface TechnologyRepository {
  getAll(): Promise<Technology[]>;
  getById(id: EntityId): Promise<Technology>;
}
