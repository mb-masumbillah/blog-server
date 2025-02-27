import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { UserService } from './user.service';

const RegisterUser = catchAsync(async (req, res) => {
  const result = await UserService.RegisterUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User registered successfully',
    data: result,
  });
});

export const UserController = {
  RegisterUser,
};
