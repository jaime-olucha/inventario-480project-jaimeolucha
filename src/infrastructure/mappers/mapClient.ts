import type { ClientDTO } from "@/infrastructure/dtos/Client/ClientDTO";
import type { Client } from "../../domain/models/Client/Client";
import type { SectorDTO } from "@/infrastructure/dtos/Client/SectorDTO";
import type { Sector } from "../../domain/models/Client/Sector";
import type { ContactDTO } from "@/infrastructure/dtos/Client/ContactDTO";
import type { Contact, CreateContactRequest } from "../../domain/models/Client/Contact";
import type { ClientProjectDTO } from "@/infrastructure/dtos/Client/ClientProjectDTO";
import type { ClientProject } from "../../domain/models/Client/ClientProject";
import type { UpdateClientRequest } from "../../domain/models/Client/UpdateClientRequest";
import type { UpdateClientRequestDTO } from "../dtos/Client/UpdateClientRequestDTO";


export const mapSector = (dto: SectorDTO): Sector => ({
  id: dto.id,
  name: dto.name,
});

export const mapClient = (dto: ClientDTO): Client => ({
  id: dto.id,
  name: dto.name,
  isActive: dto.is_active,
  sectorId: dto.sector.id,
  sectorName: dto.sector.name,
});

export const mapContact = (dto: ContactDTO): Contact => ({
  id: dto.id,
  fullName: dto.full_name,
  phone: dto.phone_number,
  email: dto.email,
  isActive: dto.is_active === true || String(dto.is_active) === "true" || String(dto.is_active) === "1",
  isMain: dto.is_main === true || String(dto.is_main) === "true" || String(dto.is_main) === "1",
  note: dto.note,
})

export const mapClientProjects = (dto: ClientProjectDTO): ClientProject => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  startDate: dto.start_date,
  isActive: dto.is_active,
  teamMembers: dto.team_members
})

export const mapUpdateClientRequest = (request: UpdateClientRequest): UpdateClientRequestDTO => ({
  name: request.name,
  is_active: request.isActive,
  sector_id: request.sectorId,
});

export const mapContactRequest = (request: Contact | CreateContactRequest): Omit<ContactDTO, "id"> => ({
  full_name: request.fullName,
  phone_number: request.phone,
  email: request.email,
  is_active: request.isActive,
  is_main: request.isMain,
  note: request.note,
})

