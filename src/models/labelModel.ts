import { Label } from '../types/label';

export interface LabelModel {
  id: number;
  name: string;
  color: string;
}

export const createLabelModel = (raw: Label): LabelModel => {
  return {
    id: raw.id,
    name: raw.name,
    color: raw.color,
  };
};
