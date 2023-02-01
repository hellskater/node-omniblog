import { Post } from '@/interfaces/posts.interface';
import { User } from '@/interfaces/users.interface';
import { model, Schema, Document } from 'mongoose';

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
    type: Schema.Types.ObjectId,
    ref: 'User',
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
