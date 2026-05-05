import type { EntityId } from "../value-objects/EntityId";
import type { Client } from "../models/Client/Client";
import type { ClientProject } from "../models/Client/ClientProject";
import type { Contact } from "../models/Client/Contact";

export interface ClientRepository {
  getAll(): Promise<Client[]>;
  getById(id: EntityId): Promise<Client>;
  getProjects(id: EntityId): Promise<ClientProject[]>;
  getContacts(id: EntityId): Promise<Contact[]>;
}
