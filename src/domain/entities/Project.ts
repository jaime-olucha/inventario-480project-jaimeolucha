import type { EntityId } from "../types/EntityId";

export interface Project {
    id: EntityId;
    name: string;
    description?: string;
    startDate: Date;
    clientId: EntityId
    isActive: boolean;
}