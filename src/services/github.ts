import { Issue } from '../types/issue';
import {
  ListCommentsOptions,
  ListIssuesOptions,
  ListMilestonesOptions,
  ListRepositoriesOptions,
} from '../types/listOption';
import { Milestone } from '../types/milestone';
import { Repository } from '../types/repository';
import { hasBody } from '../utils/hasBody';
import { toQuery } from '../utils/toQuery';

type AnyFunction = (...args: any[]) => any;

interface GithubOptions {
  token: string;
  owner: string;
  repo: string;
}

const apiBase = 'https://api.github.com';

const request = async <T = unknown>(
  token: string,
  method: string,
  url: string,
  data?: Record<string, unknown>,
): Promise<T> => {
  const query = data && !hasBody(method) ? toQuery(data) : '';
  const body = data && hasBody(method) ? JSON.stringify(data) : undefined;

  const response = await fetch(`${apiBase}${url}${query}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${token}`,
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.statusText}`);
  }

  return response.json() satisfies Promise<T>;
};

export const createGithubClient = ({ token, owner, repo }: GithubOptions) => {
  const listMilestones = async (options: ListMilestonesOptions = {}): Promise<Milestone[]> => {
    const { state, sort, direction, page, pageSize } = options;

    const query = { state, sort, direction, page, per_page: pageSize };

    return request<Milestone[]>(token, 'GET', `/repos/${owner}/${repo}/milestones`, query);
  };

  const listIssues = async (options: ListIssuesOptions): Promise<Issue[]> => {
    const { milestone, labels, state, sort, direction, page, pageSize } = options;

    const query = {
      milestone,
      labels,
      state,
      sort,
      direction,
      page,
      per_page: pageSize,
      creator: owner,
    };

    return request<Issue[]>(token, 'GET', `/repos/${owner}/${repo}/issues`, query);
  };

  const getIssue = (issue: number): Promise<Issue> => {
    return request<Issue>(token, 'GET', `/repos/${owner}/${repo}/issues/${issue}`);
  };

  const listComments = (options: ListCommentsOptions): Promise<Comment[]> => {
    const { issue, sort, direction, page, pageSize } = options;
    const query = { sort, direction, page, per_page: pageSize };

    return request<Comment[]>(
      token,
      'GET',
      `/repos/${owner}/${repo}/issues/${issue}/comments`,
      query,
    );
  };

  const listRepositories = (options: ListRepositoriesOptions): Promise<Repository[]> => {
    const { type, sort, direction, page, pageSize } = options;
    const query = { type, sort, direction, page, per_page: pageSize };

    return request<Repository[]>(token, 'GET', `/users/${owner}/repos`, query);
  };

  return {
    listMilestones,
    listIssues,
    getIssue,
    listComments,
    listRepositories,
  };
};

export default createGithubClient({
  token:
    import.meta.env.VITE_GITHUB_ACCESS_TOKEN_PART1 + import.meta.env.VITE_GITHUB_ACCESS_TOKEN_PART2,
  owner: import.meta.env.VITE_GITHUB_OWNER,
  repo: import.meta.env.VITE_GITHUB_REPO,
});
