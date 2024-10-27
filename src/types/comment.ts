import { User } from './user';

export interface Comment {
  id: number;
  body: string;
  html_url: string;
  author_association: string;
  created_at: string;
  updated_at: string;
  user: User;
}
