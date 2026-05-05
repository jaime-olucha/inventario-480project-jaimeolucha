import type { EntityId } from "../value-objects/EntityId";
import type { LinkDTO } from "./Client/LinkDTO";
import type { TechnologyDTO } from "./Project/TechnologyDTO";


export interface DevelopmentDTO {
  id: EntityId;
  name: string;
  description?: string;
  technology: TechnologyDTO;
  url_Repository: string
  links: LinkDTO;
}