import type { EntityId } from "../value-objects/EntityId";
import type { Environment } from "../value-objects/Environment";


export interface LinkDTO {
  id: EntityId;
  environment: Environment;
  url: string;
}