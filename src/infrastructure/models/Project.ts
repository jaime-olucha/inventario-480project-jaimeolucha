import type { EntityId } from "@/domain/value-objects/EntityId";
import type { Client } from "./Client";

export interface Project {
  id: EntityId;
  name: string;
  description?: string;
  startDate: Date;
  isActive: boolean;
  client: Client;
}

