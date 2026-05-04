import type { EntityId } from "@/domain/value-objects/EntityId";

export interface ClientProject {
  id: EntityId;
  name: string;
  description?: string;
  startDate: string
  isActive: boolean;
  teamMembers: number;
}