import type { EntityId } from "../../../domain/types/EntityId";
import type { SystemRole } from "../../../domain/types/SystemRole";


export interface JwtPayload {
    id: EntityId;
    role: SystemRole;
    email: string
    exp: number;
    iat: number
}