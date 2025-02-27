import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { adminService } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await adminService.blockUserIntoDB(userId, req?.user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User blocked successfully',
  });
});

export const adminController = {
  blockUser,
};
