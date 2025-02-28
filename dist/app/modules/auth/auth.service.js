"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../Error/AppError"));
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const LoginAuthIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isExistingUser(payload === null || payload === void 0 ? void 0 : payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'This user is not found !');
    }
    const isBlocked = user.isBlocked;
    if (isBlocked) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is deleted !');
    }
    if (!(yield user_model_1.User.isPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Password do not matched');
    }
    const jwtPayload = {
        email: payload === null || payload === void 0 ? void 0 : payload.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = (0, auth_utils_1.CreateToken)(jwtPayload, config_1.default.jwt_access_token, config_1.default.jwt_access_expires_id);
    return {
        accessToken,
    };
});
exports.AuthService = {
    LoginAuthIntoDB,
};
