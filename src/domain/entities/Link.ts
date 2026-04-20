import type { EntityId } from "../types/EntityId";
import type { Environment } from "../types/Environment";


export interface Link {
    id: EntityId;
    environtment: Environment;
    url: string;
    developmentId: EntityId
}