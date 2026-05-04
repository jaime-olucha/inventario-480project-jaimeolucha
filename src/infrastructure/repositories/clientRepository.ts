import { httpClient } from "../http/httpClient";
import { API_ENDPOINTS } from "../http/types/endpoints";
import { HttpMethod } from "../http/types/HttpMethods";
import type { EntityId } from "@/domain/value-objects/EntityId";
import type { ClientDTO } from "@/domain/dtos/ClientDTO";
import type { ClientProjectDTO } from "@/domain/dtos/ClientProjectDTO";
import type { ContactDTO } from "@/domain/dtos/ContactDTO";
import type { Client } from "../models/Client";
import type { ClientProject } from "../models/ClientProject";
import type { Contact } from "../models/Contact";
import { mapClient, mapClientProjects, mapContact } from "../mappers/mapClient";


export const getClientsApi = async (): Promise<Client[]> => {

  const response = await httpClient<ClientDTO[]>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.CLIENTS.LIST
  })

  return response.
    map(mapClient);
}

export const getClientByIdApi = async (id: EntityId): Promise<Client> => {

  const response = await httpClient<ClientDTO>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.CLIENTS.BY_ID(id)
  })

  return mapClient(response);
}

export const getClientProjectsApi = async (id: EntityId): Promise<ClientProject[]> => {
  const response = await httpClient<ClientProjectDTO[]>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.CLIENTS.PROJECTS(id),
  })

  return response.map(mapClientProjects);
}

export const getClientContactsApi = async (id: EntityId): Promise<Contact[]> => {
  const response = await httpClient<ContactDTO[]>({
    method: HttpMethod.GET,
    path: API_ENDPOINTS.CLIENTS.CONTACTS(id)
  })

  return response.map(mapContact)
}




/*

  export const getUsersApi = async (): Promise<User[]> => {
  
    const response = await httpClient<UserDTO[]>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.USERS.LIST
    })
  
    return response.map(mapUser);
  }
  
  
  export const getUserByIdApi = async (id: EntityId): Promise<User> => {
  
    const response = await httpClient<UserDTO>({
      method: HttpMethod.GET,
      path: API_ENDPOINTS.USERS.BY_ID(id),
    })
  
    return mapUser(response)
  }

*/