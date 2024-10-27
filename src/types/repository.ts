import { User } from './user';

export interface Repository {
  id: number;
  owner: User;
  full_name: string;
  name: string;
  html_url: string;
  description: string;
  language: string;
  forks_count: number;
  stargazers_count: number;
  open_issues_count: number;
  archived: boolean;
  disabled: boolean;
  pushed_at: string;
  created_at: string;
  updated_at: string;
}
