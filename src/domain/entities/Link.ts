import type { EntityId } from "../types/EntityId";
import type { Environtment } from "../types/Environtment";


export interface Link {
    id: EntityId;
    environtment: Environtment;
    url: string;
    developmentId: EntityId
}