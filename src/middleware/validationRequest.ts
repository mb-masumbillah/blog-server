import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validationRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({ body: req.body });
    next();
  });
};

export default validationRequest;
