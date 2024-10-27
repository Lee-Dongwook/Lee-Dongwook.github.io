import { State } from './enum';
import { Label } from './label';
import { Milestone } from './milestone';
import { User } from './user';

export interface Issue {
  id: number;
  number: number;
  title: string;
  state: State;
  body: string;
  comments: number;
  user: User;
  milestone: Milestone;
  labels: Label[];
  html_url: string;
  created_at: string;
  updated_at: string;
}
