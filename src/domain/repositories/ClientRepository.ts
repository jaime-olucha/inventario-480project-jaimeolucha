import type { EntityId } from "../value-objects/EntityId";
import type { Client } from "../models/Client/Client";
import type { ClientProject } from "../models/Client/ClientProject";
import type { CreateClientRequest } from "../models/Client/CreateClientRequest";
import type { UpdateClientRequest } from "../models/Client/UpdateClientRequest";

export interface ClientRepository {
  getAll(page: number, limit: number): Promise<Client[]>;
  getById(id: EntityId): Promise<Client>;
  getProjects(id: EntityId): Promise<ClientProject[]>;
  createClient(data: CreateClientRequest): Promise<void>;
  patchActive(id: EntityId, isActive: boolean): Promise<void>;
  putClient(id: EntityId, data: UpdateClientRequest): Promise<void>;
  deleteClient(id: EntityId): Promise<void>;
}
