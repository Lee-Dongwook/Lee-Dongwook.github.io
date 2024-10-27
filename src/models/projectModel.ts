import { Repository } from '../types/repository';
import { createUserModel, UserModel } from './userModel';

export interface ProjectModel {
  id: number;
  owner: UserModel;
  fullName: string;
  name: string;
  htmlUrl: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  openIssuesCount: number;
  archived: boolean;
  disabled: boolean;
  pushedAt: string;
  createdAt: string;
  updatedAt: string;
}

export const createProjectModel = (raw: Repository): ProjectModel => {
  return {
    id: raw.id,
    owner: createUserModel(raw.owner),
    fullName: raw.full_name,
    name: raw.name,
    htmlUrl: raw.html_url,
    description: raw.description,
    language: raw.language,
    forksCount: raw.forks_count,
    stargazersCount: raw.stargazers_count,
    openIssuesCount: raw.open_issues_count,
    archived: raw.archived,
    disabled: raw.disabled,
    pushedAt: raw.pushed_at,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
};
