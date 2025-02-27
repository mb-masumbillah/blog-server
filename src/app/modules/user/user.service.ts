import { StatusCodes } from 'http-status-codes';
import AppError from '../../Error/AppError';
import { IUser } from './user.interface';
import { User } from './user.model';

const RegisterUserIntoDB = async (payload: IUser) => {
  const isExistingUser = await User.findOne({ email: payload?.email });
  if (isExistingUser) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'User with this email already exists',
    );
  }
  const result = await User.create(payload);
  return result;
};

export const UserService = {
  RegisterUserIntoDB,
};
