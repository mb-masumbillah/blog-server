/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../app/config';
import { ZodError } from 'zod';
import handleZodError from '../app/Error/handleValidationZodError';
import { TErrorSources } from '../app/interface/global_interface';
import handleMongooseError from '../app/Error/handleValidationMongooseError';
import handleMongooseCastError from '../app/Error/handleMongooseCastError';
import handleDuplicateError from '../app/Error/handleDuplicateError';
import AppError from '../app/Error/AppError';

const globalErrorHandle: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
): void => {
  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong !',
    },
  ];

  if (error instanceof ZodError) {
    const simpliedError = handleZodError(error);
    statusCode = simpliedError.statusCode;
    message = simpliedError.message;
    errorSources = simpliedError.errorSources;
  } else if (error?.name === 'ValidationError') {
    const simpliedError = handleMongooseError(error);
    statusCode = simpliedError.statusCode;
    message = simpliedError.message;
    errorSources = simpliedError.errorSources;
  } else if (error?.name === 'CastError') {
    const simpliedError = handleMongooseCastError(error);
    statusCode = simpliedError.statusCode;
    message = simpliedError.message;
    errorSources = simpliedError.errorSources;
  } else if (error?.errorResponse?.code === 11000) {
    const simpliedError = handleDuplicateError(error);
    statusCode = simpliedError.statusCode;
    message = simpliedError.message;
    errorSources = simpliedError.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorSources = [
      {
        path: '',
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorSources = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    // error: error,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error.stack : null,
  });
};

export default globalErrorHandle;
