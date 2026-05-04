import type { Project } from "./Project";


export interface ProjectListItem extends Project {
  teamMembers: number;
}
