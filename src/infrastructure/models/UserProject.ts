import type { Client } from "./Client";
import type { EntityId } from "@/domain/value-objects/EntityId";


export interface UserProject {
  id: EntityId;
  name: string;
  description?: string | null;
  isActive: boolean;
  client: Client;
  teamMembers: number;
}
