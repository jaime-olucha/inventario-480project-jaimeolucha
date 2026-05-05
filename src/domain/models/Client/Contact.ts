import type { EntityId } from "@/domain/value-objects/EntityId";


export interface Contact {
  id: EntityId;
  fullName: string;
  phone?: string;
  email: string;
  isActive: string;
  isMain: string;
  note?: string;
}