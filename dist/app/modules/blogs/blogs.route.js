"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blgosRoute = void 0;
const express_1 = require("express");
const blogs_controller_1 = require("./blogs.controller");
const user_constant_1 = require("../user/user.constant");
const auth_1 = __importDefault(require("../../../middleware/auth"));
const validationRequest_1 = __importDefault(require("../../../middleware/validationRequest"));
const blog_validation_1 = require("./blog.validation");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validationRequest_1.default)(blog_validation_1.blogValidation.blogValidationSchema), blogs_controller_1.blogsController.blogsCreate);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validationRequest_1.default)(blog_validation_1.blogValidation.updateblogValidationSchema), blogs_controller_1.blogsController.updateBlogs);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blogs_controller_1.blogsController.deleteBlogs);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blogs_controller_1.blogsController.getallBlogs);
exports.blgosRoute = router;
