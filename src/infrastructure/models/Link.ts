import type { EntityId } from "@/domain/value-objects/EntityId";
import type { Environment } from "@/domain/value-objects/Environment";


export interface Link {
  id: EntityId;
  environment: Environment;
  url: string;
}