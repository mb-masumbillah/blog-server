import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../utils/sendResponse';

const LoginAuth = catchAsync(async (req, res) => {
  const result = await AuthService.LoginAuthIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Login successful',
    data: result,
  });
});

export const AuthController = {
  LoginAuth,
};
