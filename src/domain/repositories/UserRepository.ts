import type { EntityId } from "../value-objects/EntityId";
import type { User } from "../models/User/User";
import type { CreateUserRequest } from "../models/User/CreateUserRequest";
import type { UserProject } from "../models/User/UserProject";
import type { UserTimeEntriesResponse } from "../models/User/UserTimeEntriesResponse";

export interface UserRepository {
  getAll(page: number, limit: number): Promise<User[]>;
  getById(id: EntityId): Promise<User>;
  getProjects(id: EntityId): Promise<UserProject[]>;
  getTimeEntries(id: EntityId): Promise<UserTimeEntriesResponse>;
  createUser(data: CreateUserRequest): Promise<void>;
  patchActive(id: EntityId, isActive: boolean): Promise<void>;
}
