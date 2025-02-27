import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is Required' }),
    email: z
      .string()
      .email('Invalid email')
      .min(1, 'Email is Required')
      .refine(
        (val) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
        { message: 'Email must be unique ? => example@domain.com' },
      ),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters'),
    role: z.enum(['admin', 'user']),
    isBlocked: z.boolean().default(false),
  }),
});

export const userValidation = {
  userValidationSchema,
};
