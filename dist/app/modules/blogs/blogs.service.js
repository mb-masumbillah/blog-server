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
exports.BlogsService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../Error/AppError"));
const blogs_model_1 = require("./blogs.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const blogs_constant_1 = require("./blogs.constant");
const user_model_1 = require("../user/user.model");
const createBlogsIntoDB = (payload, email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: email });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'User not found');
    }
    const isExistTitle = yield blogs_model_1.Blogs.findOne({
        title: { $regex: payload === null || payload === void 0 ? void 0 : payload.title, $options: 'i' },
    });
    if (isExistTitle) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Blogs title is Exist please new title use !');
    }
    const result = (yield blogs_model_1.Blogs.create(Object.assign(Object.assign({}, payload), { author: user._id, isPublished: true }))).populate('author');
    return result;
});
const updateBlogsIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistingBlogs = yield blogs_model_1.Blogs.findById(id);
    if (!isExistingBlogs) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Blogs isn't Exist");
    }
    const result = yield blogs_model_1.Blogs.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).populate('author');
    return result;
});
const deleteBlogsIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistingBlogs = yield blogs_model_1.Blogs.findById(id);
    if (!isExistingBlogs) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Blogs isn't Exist");
    }
    const result = yield blogs_model_1.Blogs.findByIdAndDelete(id, {
        new: true,
        runValidators: true,
    });
    return result;
});
const getAllBlogsIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blogs_model_1.Blogs.find(), query)
        .searchQuery(blogs_constant_1.searchFields)
        .sortBy()
        .sortOrder()
        .filter();
    const result = yield blogQuery.modelQuey;
    return result;
});
exports.BlogsService = {
    createBlogsIntoDB,
    updateBlogsIntoDB,
    deleteBlogsIntoDB,
    getAllBlogsIntoDB,
};
