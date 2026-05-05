import type { EntityId } from "../value-objects/EntityId";


export interface ContactDTO {
  id: EntityId;
  full_name: string;
  phone_number?: string;
  email: string;
  is_active: string;
  is_main: string;
  note?: string;
}