import { StatusCodes } from 'http-status-codes';
import AppError from '../../Error/AppError';
import { User } from '../user/user.model';

const blockUserIntoDB = async (id: string, user: Record<string, unknown>) => {
  const userToUpdate = await User.findById(id);

  if (!userToUpdate) {
    throw new Error('User not found');
  }

  if (userToUpdate?.role === user?.role) {
    throw new AppError(StatusCodes.CONFLICT, 'You cannot block the admin 😡');
  }

  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true, runValidators: true },
  );
  return result;
};

export const adminService = {
  blockUserIntoDB,
};
