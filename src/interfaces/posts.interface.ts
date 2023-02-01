import { User } from './users.interface';

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}
