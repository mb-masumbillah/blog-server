import { z } from 'zod';

const blogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    content: z.string({ required_error: 'Content is required' }),
  }),
});
const updateblogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    content: z.string({ required_error: 'Content is required' }).optional(),
  }),
});

export const blogValidation = {
  blogValidationSchema,
  updateblogValidationSchema,
};
