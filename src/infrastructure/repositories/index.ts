import { ApiAuthRepository } from "./ApiAuthRepository";
import { ApiUserRepository } from "./ApiUserRepository";
import { ApiClientRepository } from "./ApiClientRepository";
import { ApiProjectRepository } from "./ApiProjectRepository";
import { ApiTechnologyRepository } from "./ApiTechnologyRepository";
import { ApiSectorRepository } from "./ApiSectorRepository";

export const authRepository = new ApiAuthRepository();
export const userRepository = new ApiUserRepository();
export const clientRepository = new ApiClientRepository();
export const projectRepository = new ApiProjectRepository();
export const technologyRepository = new ApiTechnologyRepository();
export const sectorRepository = new ApiSectorRepository();
