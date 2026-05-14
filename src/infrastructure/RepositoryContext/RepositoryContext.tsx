import { createContext, useContext } from "react";
import type { AuthRepository } from "@/domain/repositories/AuthRepository";
import type { UserRepository } from "@/domain/repositories/UserRepository";
import type { ClientRepository } from "@/domain/repositories/ClientRepository";
import type { ProjectRepository } from "@/domain/repositories/ProjectRepository";
import type { TechnologyRepository } from "@/domain/repositories/TechnologyRepository";
import type { SectorRepository } from "@/domain/repositories/SectorRepository";
import { authRepository, userRepository, clientRepository, projectRepository, technologyRepository, sectorRepository, contactRepository, } from "../repositories/ApiInstances";
import type { ContactRepository } from "@/domain/repositories/ContactRepository";

interface Repositories {
  auth: AuthRepository;
  user: UserRepository;
  client: ClientRepository;
  contact: ContactRepository;
  project: ProjectRepository;
  technology: TechnologyRepository;
  sector: SectorRepository;
}

const RepositoryContext = createContext<Repositories>({
  auth: authRepository,
  user: userRepository,
  client: clientRepository,
  contact: contactRepository,
  project: projectRepository,
  technology: technologyRepository,
  sector: sectorRepository,
});

export function RepositoryProvider({ children }: { children: React.ReactNode }) {
  return (
    <RepositoryContext.Provider
      value={{
        auth: authRepository,
        user: userRepository,
        client: clientRepository,
        contact: contactRepository,
        project: projectRepository,
        technology: technologyRepository,
        sector: sectorRepository,
      }}>
      {children}
    </RepositoryContext.Provider>
  );
}

export function useRepositories(): Repositories {
  return useContext(RepositoryContext);
}
