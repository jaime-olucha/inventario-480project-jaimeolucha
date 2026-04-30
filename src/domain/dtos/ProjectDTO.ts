import type { EntityId } from "../value-objects/EntityId";
import type { ClientDTO } from "./ClientDTO";

export interface ProjectDTO {
  id: EntityId;
  name: string;
  description?: string;
  start_date: Date;
  is_active: boolean;
  client: ClientDTO;
}

