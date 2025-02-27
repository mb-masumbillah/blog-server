import { Router } from 'express';
import { UserRouter } from '../app/modules/user/user.route';
import { blgosRoute } from '../app/modules/blogs/blogs.route';
import { AdminRouter } from '../app/modules/Admin/admin.route';

const router = Router();

const moudleRoutes = [
  {
    path: '/auth',
    route: UserRouter,
  },
  {
    path: '/blogs',
    route: blgosRoute,
  },
  {
    path: '/admin',
    route: AdminRouter,
  },
];

moudleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
