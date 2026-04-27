import type { EntityId } from "../types/EntityId";
import type { Client } from "./Client";

export interface UserProjects {
    id: EntityId;
    name: string;
    description: string;
    is_active: boolean;
    client: Client;
    team_members: number;
}