import { Post } from '@/interfaces/posts.interface';
import { model, Schema, Document } from 'mongoose';
import { userSchema } from './users.model';

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
    type: userSchema,
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
