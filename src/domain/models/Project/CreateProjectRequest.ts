import type { EntityId } from "@/domain/value-objects/EntityId";

export interface CreateProjectRequest {
  name: string;
  description: string;
  startDate?: string;
  clientId: EntityId;
}
