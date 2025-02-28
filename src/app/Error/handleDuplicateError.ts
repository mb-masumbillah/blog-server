/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/global_interface';

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const statusCode = StatusCodes.INTERNAL_SERVER_ERROR || 500;
  const match = error?.message.match(/name: "([^"]+)"/);
  const extracted_msg = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `/${extracted_msg}/ is exist`,
    },
  ];
  return {
    statusCode,
    message: 'Duplicate Error',
    errorSources,
  };
};

export default handleDuplicateError;
