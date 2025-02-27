import { Types } from 'mongoose';

export type TBlgos = {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
};
