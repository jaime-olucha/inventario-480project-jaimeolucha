import type { Sector } from "../models/Client/Sector";

export interface SectorRepository {
  getAll(): Promise<Sector[]>;
}
