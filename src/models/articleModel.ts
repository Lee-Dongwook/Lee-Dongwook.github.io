import { Issue } from '../types/issue';
import { createLabelModel, LabelModel } from './labelModel';

export interface ArticleModel {
  id: number;
  number: number;
  title: string;
  body: string;
  comments: number;
  labels: LabelModel[];
  htmlUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const createArticleModel = (raw: Issue): ArticleModel => {
  return {
    id: raw.id,
    number: raw.number,
    title: raw.title,
    body: raw.body,
    comments: raw.comments,
    labels: raw.labels.map(createLabelModel),
    htmlUrl: raw.html_url,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
};
