import { Direction, RepositorySort, RepositoryType, Sort, State } from './enum';

export interface ListMilestonesOptions {
  state?: State;
  sort?: Sort;
  direction?: Direction;
  page?: number;
  pageSize?: number;
}

export interface ListIssuesOptions {
  milestone: number;
  labels?: string;
  state?: State;
  sort?: Sort;
  direction?: Direction;
  page?: number;
  pageSize?: number;
}

export interface ListCommentsOptions {
  issue: number;
  sort?: Sort;
  direction?: Direction;
  page?: number;
  pageSize?: number;
}

export interface ListRepositoriesOptions {
  type?: RepositoryType;
  sort?: RepositorySort;
  direction?: Direction;
  page?: number;
  pageSize?: number;
}
