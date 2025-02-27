import { Router } from 'express';
import { adminController } from './admin.controller';
import auth from '../../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { blogsController } from '../blogs/blogs.controller';

const router = Router();

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  adminController.blockUser,
);
router.delete('/blogs/:id', auth(USER_ROLE.admin), blogsController.deleteBlogs);

export const AdminRouter = router;
