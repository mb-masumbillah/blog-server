import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { BlogsService } from './blogs.service';

const blogsCreate = catchAsync(async (req, res) => {
  const result = await BlogsService.createBlogsIntoDB(
    req.body,
    req?.user?.email,
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Blog created successfully',
    data: result,
  });
});
const updateBlogs = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await BlogsService.updateBlogsIntoDB(id, data);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Blog updated successfully',
    data: result,
  });
});
const deleteBlogs = catchAsync(async (req, res) => {
  const { id } = req.params;

  await BlogsService.deleteBlogsIntoDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
  });
});
const getallBlogs = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await BlogsService.getAllBlogsIntoDB(query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

export const blogsController = {
  blogsCreate,
  updateBlogs,
  deleteBlogs,
  getallBlogs,
};
