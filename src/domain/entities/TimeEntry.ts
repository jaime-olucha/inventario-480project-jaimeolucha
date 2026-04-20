import type { EntityId } from "../types/EntityId";


export interface TimeEntry {
    id: EntityId;
    projectId: EntityId;
    date: string;
    hour: number;
    comment?: string;
}