import { Post } from '@/interfaces/posts.interface';
import { model, Schema, Document } from 'mongoose';
import { fileteredUserSchema } from './users.model';

const postSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: fileteredUserSchema,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const postModel = model<Post & Document>('Post', postSchema);

export default postModel;
