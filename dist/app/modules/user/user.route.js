"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_controller_1 = require("../auth/auth.controller");
const validationRequest_1 = __importDefault(require("../../../middleware/validationRequest"));
const auth_validation_1 = require("../auth/auth.validation");
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.post('/register', (0, validationRequest_1.default)(user_validation_1.userValidation.userValidationSchema), user_controller_1.UserController.RegisterUser);
router.post('/login', (0, validationRequest_1.default)(auth_validation_1.loginValidationSchema), auth_controller_1.AuthController.LoginAuth);
exports.UserRouter = router;
