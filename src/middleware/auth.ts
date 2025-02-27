import { StatusCodes } from 'http-status-codes';
import AppError from '../app/Error/AppError';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../app/config';
import { User } from '../app/modules/user/user.model';
import { TUserRole } from '../app/modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not Authorized');
    }

    //verify
    const decoded = jwt.verify(token, config.jwt_access_token as string);

    const { email, role } = decoded as JwtPayload;

    const user = await User.isExistingUser(email);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
    }

    const isBlocked = user.isBlocked;
    if (isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not Authorized');
    }
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
