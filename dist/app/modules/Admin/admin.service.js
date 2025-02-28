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
exports.adminService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../Error/AppError"));
const user_model_1 = require("../user/user.model");
const blockUserIntoDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userToUpdate = yield user_model_1.User.findById(id);
    if (!userToUpdate) {
        throw new Error('User not found');
    }
    if ((userToUpdate === null || userToUpdate === void 0 ? void 0 : userToUpdate.role) === (user === null || user === void 0 ? void 0 : user.role)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'You cannot block the admin 😡');
    }
    const result = yield user_model_1.User.findByIdAndUpdate(id, { isBlocked: true }, { new: true, runValidators: true });
    return result;
});
exports.adminService = {
    blockUserIntoDB,
};
