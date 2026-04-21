import type { EntityId } from "../types/EntityId";
import type { SystemRole } from "../types/SystemRole";

export interface User {
    id: EntityId;
    name: string;
    surname: string;
    email: string;
    role: SystemRole;
    isActive: boolean;
}