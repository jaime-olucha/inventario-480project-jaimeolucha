import type { EntityId } from "@/domain/value-objects/EntityId";


export interface UserProject {
  id: EntityId;
  name: string;
  description?: string | null;
  isActive: boolean;
  clientId: EntityId;
  clientName: string;
  teamMembers: number;
}
