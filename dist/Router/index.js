"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../app/modules/user/user.route");
const blogs_route_1 = require("../app/modules/blogs/blogs.route");
const admin_route_1 = require("../app/modules/Admin/admin.route");
const router = (0, express_1.Router)();
const moudleRoutes = [
    {
        path: '/auth',
        route: user_route_1.UserRouter,
    },
    {
        path: '/blogs',
        route: blogs_route_1.blgosRoute,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRouter,
    },
];
moudleRoutes.forEach((route) => router.use(route === null || route === void 0 ? void 0 : route.path, route === null || route === void 0 ? void 0 : route.route));
exports.default = router;
