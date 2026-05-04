import type { EntityId } from "@/domain/value-objects/EntityId";

export interface Project {
  id: EntityId;
  name: string;
  description?: string;
  startDate: Date;
  isActive: boolean;
  clientId: EntityId;
  clientName: string;
}

