import type { EntityId } from "../value-objects/EntityId";
import type { ProjectListItem } from "../models/Project/ProjectListItem";
import type { ProjectDetail } from "../models/Project/ProjectDetail";
import type { ProjectUser } from "../models/Project/ProjectUser";
import type { Development } from "../models/Project/Development";
import type { ProjectTimeEntry } from "../models/Project/ProjectTimeEntry";
import type { CreateProjectRequest } from "../models/Project/CreateProjectRequest";

export interface ProjectRepository {
  getAll(page: number, limit: number): Promise<ProjectListItem[]>;
  getById(id: EntityId): Promise<ProjectDetail>;
  getUsers(id: EntityId): Promise<ProjectUser[]>;
  getDevelopments(id: EntityId): Promise<Development[]>;
  getTimeEntries(id: EntityId): Promise<ProjectTimeEntry[]>;
  getTimeEntryById(projectId: EntityId, entryId: EntityId): Promise<ProjectTimeEntry>;
  createProject(data: CreateProjectRequest): Promise<void>;
}
