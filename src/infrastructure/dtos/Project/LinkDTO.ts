import type { EntityId } from "../../../domain/value-objects/EntityId";
import type { Environment } from "../../../domain/value-objects/Environment";


export interface LinkDTO {
  id: EntityId;
  environment: Environment;
  url: string;
}