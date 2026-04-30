import type { ClientDTO } from "@/domain/dtos/ClientDTO";
import type { Client } from "../models/Client";
import type { SectorDTO } from "@/domain/dtos/SectorDTO";
import type { Sector } from "../models/Sector";
import type { ContactDTO } from "@/domain/dtos/ContactDTO";
import type { Contact } from "../models/Contact";

export const mapSector = (dto: SectorDTO): Sector => ({
  id: dto.id,
  name: dto.name,
});

export const mapClient = (dto: ClientDTO): Client => ({
  id: dto.id,
  name: dto.name,
  isActive: dto.is_active,
  sector: mapSector(dto.sector),
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