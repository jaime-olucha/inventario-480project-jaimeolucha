import type { ClientRepository } from "@/domain/repositories/ClientRepository";
import type { EntityId } from "@/domain/value-objects/EntityId";
import type { Client } from "@/domain/models/Client/Client";
import type { ClientProject } from "@/domain/models/Client/ClientProject";
import type { Contact } from "@/domain/models/Client/Contact";
import type { ClientDTO } from "@/infrastructure/dtos/Client/ClientDTO";
import type { ClientProjectDTO } from "@/infrastructure/dtos/Client/ClientProjectDTO";
import type { ContactDTO } from "@/infrastructure/dtos/Client/ContactDTO";
import { httpClient } from "../http/httpClient";
import { API_ENDPOINTS } from "../http/types/endpoints";
import { HttpMethod } from "../http/types/HttpMethods";
import { mapClient, mapClientProjects, mapContact } from "../mappers/mapClient";
import type { CreateClientRequest } from "@/domain/models/Client/CreateClientRequest";
import type { CreateClientRequestDTO } from "../dtos/Client/CreateClientRequestDTO";
import { v7 as uuidv7 } from "uuid";

export class ApiClientRepository implements ClientRepository {

  async getAll(page: number, limit: number): Promise<Client[]> {
    const response = await httpClient<ClientDTO[]>({
      method: HttpMethod.GET,
      path: `${API_ENDPOINTS.CLIENTS.LIST}?page=${page}&limit=${limit}`,
    });
    return response.map(mapClient);
  }

  async getById(id: EntityId): Promise<Client> {
    const response = await httpClient<ClientDTO>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.CLIENTS.BY_ID(id),
    });
    return mapClient(response);
  }

  async getProjects(id: EntityId): Promise<ClientProject[]> {
    const response = await httpClient<ClientProjectDTO[]>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.CLIENTS.PROJECTS(id),
    });
    return response.map(mapClientProjects);
  }

  async getContacts(id: EntityId): Promise<Contact[]> {
    const response = await httpClient<ContactDTO[]>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.CLIENTS.CONTACTS(id),
    });
    return response.map(mapContact);
  }

  async createClient(data: CreateClientRequest): Promise<void> {
    const body: CreateClientRequestDTO = { id: uuidv7(), name: data.name, sector_id: data.sectorId, };
    await httpClient<void, CreateClientRequestDTO>({
      method: HttpMethod.POST,
      path: API_ENDPOINTS.CLIENTS.CREATE,
      body,
    });
  }
}
