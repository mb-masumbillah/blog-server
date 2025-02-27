import { model, Schema } from 'mongoose';
import { TBlgos } from './blogs.interface';

const blogsSchema = new Schema<TBlgos>(
  {
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
    isPublished: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Blogs = model<TBlgos>('Blogs', blogsSchema);
