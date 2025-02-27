import { StatusCodes } from 'http-status-codes';
import AppError from '../../Error/AppError';
import { TBlgos } from './blogs.interface';
import { Blogs } from './blogs.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchFields } from './blogs.constant';
import { User } from '../user/user.model';

const createBlogsIntoDB = async (payload: TBlgos, email: string) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User not found');
  }
  const isExistTitle = await Blogs.findOne({
    title: { $regex: payload?.title, $options: 'i' },
  });

  if (isExistTitle) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Blogs title is Exist please new title use !',
    );
  }

  const result = (
    await Blogs.create({ ...payload, author: user._id, isPublished: true })
  ).populate('author');
  return result;
};
const updateBlogsIntoDB = async (id: string, payload: Partial<TBlgos>) => {
  const isExistingBlogs = await Blogs.findById(id);
  if (!isExistingBlogs) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Blogs isn't Exist");
  }

  const result = await Blogs.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('author');
  return result;
};
const deleteBlogsIntoDB = async (id: string) => {
  const isExistingBlogs = await Blogs.findById(id);
  if (!isExistingBlogs) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Blogs isn't Exist");
  }

  const result = await Blogs.findByIdAndDelete(id, {
    new: true,
    runValidators: true,
  });
  return result;
};
const getAllBlogsIntoDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blogs.find(), query)
    .searchQuery(searchFields)
    .sortBy()
    .sortOrder()
    .filter();
  const result = await blogQuery.modelQuey;

  return result;
};

export const BlogsService = {
  createBlogsIntoDB,
  updateBlogsIntoDB,
  deleteBlogsIntoDB,
  getAllBlogsIntoDB,
};
