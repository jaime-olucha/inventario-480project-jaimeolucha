import type { EntityId } from "../value-objects/EntityId";
import type { ProjectListItem } from "../models/Project/ProjectListItem";
import type { ProjectDetail } from "../models/Project/ProjectDetail";
import type { ProjectUser } from "../models/Project/ProjectUser";
import type { ProjectRole } from "../models/Project/ProjectRole";
import type { Development } from "../models/Project/Development";
import type { ProjectTimeEntry } from "../models/Project/ProjectTimeEntry";
import type { CreateProjectRequest } from "../models/Project/CreateProjectRequest";
import type { UpdateProjectRequest } from "../models/Project/UpdateProjectRequest";

export interface ProjectRepository {
  getAll(page: number, limit: number): Promise<ProjectListItem[]>;
  getById(id: EntityId): Promise<ProjectDetail>;
  getUsers(id: EntityId): Promise<ProjectUser[]>;
  getRoles(): Promise<ProjectRole[]>;
  addUser(projectId: EntityId, userId: EntityId, roleId: EntityId): Promise<void>;
  updateUserRole(projectId: EntityId, userId: EntityId, roleId: EntityId): Promise<void>;
  removeUser(projectId: EntityId, userId: EntityId): Promise<void>;
  patchUserActive(projectId: EntityId, userId: EntityId, isActive: boolean): Promise<void>;
  getDevelopments(id: EntityId): Promise<Development[]>;
  getTimeEntries(id: EntityId): Promise<ProjectTimeEntry[]>;
  getTimeEntryById(projectId: EntityId, entryId: EntityId): Promise<ProjectTimeEntry>;
  updateTimeEntry(projectId: EntityId, entryId: EntityId, data: { date: string; hours: number; comment: string }): Promise<void>;
  deleteTimeEntry(projectId: EntityId, entryId: EntityId): Promise<void>;
  createProject(data: CreateProjectRequest): Promise<void>;
  patchActive(id: EntityId, isActive: boolean): Promise<void>;
  deleteProject(id: EntityId): Promise<void>;
  putUser(id: EntityId, data: UpdateProjectRequest): Promise<void>
}
