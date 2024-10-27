import { User } from '../types/user';

export interface UserModel {
  id: number;
  login: string;
  avatarUrl: string;
  htmlUrl: string;
}

export const createUserModel = (raw: User): UserModel => {
  return {
    id: raw.id,
    login: raw.login,
    avatarUrl: raw.avatar_url,
    htmlUrl: raw.html_url,
  };
};
