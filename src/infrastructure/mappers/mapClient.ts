import type { ClientDTO } from "@/infrastructure/dtos/Client/ClientDTO";
import type { Client } from "../../domain/models/Client/Client";
import type { SectorDTO } from "@/infrastructure/dtos/Client/SectorDTO";
import type { Sector } from "../../domain/models/Client/Sector";
import type { ContactDTO } from "@/domain/dtos/ContactDTO";
import type { Contact } from "../../domain/models/Client/Contact";
import type { ClientProjectDTO } from "@/infrastructure/dtos/Client/ClientProjectDTO";
import type { ClientProject } from "../../domain/models/Client/ClientProject";


export const mapSector = (dto: SectorDTO): Sector => ({
  id: dto.id,
  name: dto.name,
});

export const mapClient = (dto: ClientDTO): Client => ({
  id: dto.id,
  name: dto.name,
  isActive: dto.is_active,
  sectorId: dto.sector.id,
  sectorName: dto.sector.name
});

export const mapContact = (dto: ContactDTO): Contact => ({
  id: dto.id,
  fullName: dto.full_name,
  phone: dto.phone_number,
  email: dto.email,
  isActive: dto.is_active,
  isMain: dto.is_main,
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