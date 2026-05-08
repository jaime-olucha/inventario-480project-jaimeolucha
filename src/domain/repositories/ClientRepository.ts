import type { EntityId } from "../value-objects/EntityId";
import type { Client } from "../models/Client/Client";
import type { ClientProject } from "../models/Client/ClientProject";
import type { Contact } from "../models/Client/Contact";
import type { CreateClientRequest } from "../models/Client/CreateClientRequest";

export interface ClientRepository {
  getAll(page: number, limit: number): Promise<Client[]>;
  getById(id: EntityId): Promise<Client>;
  getProjects(id: EntityId): Promise<ClientProject[]>;
  getContacts(id: EntityId): Promise<Contact[]>;
  createClient(data: CreateClientRequest): Promise<void>;
}
