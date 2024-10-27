import { Comment } from '../types/comment';
import { createUserModel, UserModel } from './userModel';

export interface CommentModel {
  id: number;
  body: string;
  htmlUrl: string;
  authorAssociation: string;
  createdAt: string;
  updatedAt: string;
  user: UserModel;
}

export const createCommentModel = (raw: Comment): CommentModel => {
  return {
    id: raw.id,
    body: raw.body,
    htmlUrl: raw.html_url,
    authorAssociation: raw.author_association,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    user: createUserModel(raw.user),
  };
};
