import type { EntityId } from "@/domain/value-objects/EntityId";

export interface CreateProjectRequestDTO {
  id: EntityId
  name: string;
  description: string;
  start_date: string | null;
  client_id: EntityId;
}
