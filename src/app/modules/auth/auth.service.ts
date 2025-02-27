import { StatusCodes } from 'http-status-codes';
import AppError from '../../Error/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { CreateToken } from './auth.utils';
import config from '../../config';

const LoginAuthIntoDB = async (payload: TLoginUser) => {
  const user = await User.isExistingUser(payload?.email);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  const isBlocked = user.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
  }

  if (!(await User.isPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');
  }

  const jwtPayload = {
    email: payload?.email,
    role: user?.role,
  };

  const accessToken = CreateToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_id as string,
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  LoginAuthIntoDB,
};
