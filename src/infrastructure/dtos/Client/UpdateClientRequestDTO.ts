import type { EntityId } from "@/domain/value-objects/EntityId";

export interface UpdateClientRequestDTO {
  name: string;
  is_active: boolean;
  sector_id: EntityId;
}
