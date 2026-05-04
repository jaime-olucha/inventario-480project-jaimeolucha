import type { LinkDTO } from "@/domain/dtos/LinkDTO"
import type { Link } from "../models/Link"
import type { TechnologyDTO } from "@/domain/dtos/TechnologyDTO"
import type { Technology } from "../models/Technology"
import type { DevelopmentDTO } from "@/domain/dtos/DevelopmentDTO"
import type { Development } from "../models/Development"

export const mapLink = (dto: LinkDTO): Link => ({
  id: dto.id,
  environment: dto.environment,
  url: dto.url
})

export const mapTechnology = (dto: TechnologyDTO): Technology => ({
  id: dto.id,
  name: dto.name
})

export const mapDevelopment = (dto: DevelopmentDTO): Development => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  technology: mapTechnology(dto.technology),
  urlRepository: dto.url_Repository,
  links: mapLink(dto.links),
})