import type { EntityId } from "../types/EntityId";

export interface Client {
    id: EntityId;
    name: string;
    sectorId: EntityId;
    isActive: boolean;
}