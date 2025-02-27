import { Router } from 'express';
import { blogsController } from './blogs.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../../middleware/auth';
import validationRequest from '../../../middleware/validationRequest';
import { blogValidation } from './blog.validation';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validationRequest(blogValidation.blogValidationSchema),
  blogsController.blogsCreate,
);
router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validationRequest(blogValidation.updateblogValidationSchema),
  blogsController.updateBlogs,
);
router.delete('/:id', auth(USER_ROLE.user), blogsController.deleteBlogs);
router.get('/', auth(USER_ROLE.user), blogsController.getallBlogs);

export const blgosRoute = router;
