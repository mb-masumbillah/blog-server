import { Router } from 'express';
import { UserController } from './user.controller';
import { AuthController } from '../auth/auth.controller';
import validationRequest from '../../../middleware/validationRequest';
import { loginValidationSchema } from '../auth/auth.validation';
import { userValidation } from './user.validation';

const router = Router();

router.post(
  '/register',
  validationRequest(userValidation.userValidationSchema),
  UserController.RegisterUser,
);
router.post(
  '/login',
  validationRequest(loginValidationSchema),
  AuthController.LoginAuth,
);

export const UserRouter = router;
