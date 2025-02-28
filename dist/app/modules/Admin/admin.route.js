"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const auth_1 = __importDefault(require("../../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const blogs_controller_1 = require("../blogs/blogs.controller");
const router = (0, express_1.Router)();
router.patch('/users/:userId/block', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), admin_controller_1.adminController.blockUser);
router.delete('/blogs/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), blogs_controller_1.blogsController.deleteBlogs);
exports.AdminRouter = router;
