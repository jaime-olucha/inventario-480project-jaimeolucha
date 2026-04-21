import type { EntityId } from "../types/EntityId";


export interface Development {
    id: EntityId;
    projectId: EntityId;
    technologyId: EntityId;
    name: string;
    description: string;
    urlRepository: string
}