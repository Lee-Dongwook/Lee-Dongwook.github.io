import { Milestone } from '../types/milestone';

export interface CategoryModel {
  id: number;
  number: number;
  title: string;
  description: string;
  articles: number;
}

export const createCategoryModel = (raw: Milestone): CategoryModel => {
  return {
    id: raw.id,
    number: raw.number,
    title: raw.title,
    description: raw.description,
    articles: raw.open_issues,
  };
};
