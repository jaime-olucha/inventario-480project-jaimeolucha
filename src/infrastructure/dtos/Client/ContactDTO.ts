import type { EntityId } from "@/domain/value-objects/EntityId";


export interface ContactDTO {
  id: EntityId;
  full_name: string;
  phone_number?: string;
  email: string;
  is_active: boolean;
  is_main: boolean;
  note?: string;
}