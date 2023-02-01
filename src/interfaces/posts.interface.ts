import { FilteredUser } from './users.interface';

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: FilteredUser;
  createdAt: Date;
  updatedAt: Date;
}
