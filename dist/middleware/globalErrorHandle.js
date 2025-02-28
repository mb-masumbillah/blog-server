"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../app/config"));
const zod_1 = require("zod");
const handleValidationZodError_1 = __importDefault(require("../app/Error/handleValidationZodError"));
const handleValidationMongooseError_1 = __importDefault(require("../app/Error/handleValidationMongooseError"));
const handleMongooseCastError_1 = __importDefault(require("../app/Error/handleMongooseCastError"));
const handleDuplicateError_1 = __importDefault(require("../app/Error/handleDuplicateError"));
const AppError_1 = __importDefault(require("../app/Error/AppError"));
const globalErrorHandle = (error, req, res, next) => {
    var _a;
    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong !',
        },
    ];
    if (error instanceof zod_1.ZodError) {
        const simpliedError = (0, handleValidationZodError_1.default)(error);
        statusCode = simpliedError.statusCode;
        message = simpliedError.message;
        errorSources = simpliedError.errorSources;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simpliedError = (0, handleValidationMongooseError_1.default)(error);
        statusCode = simpliedError.statusCode;
        message = simpliedError.message;
        errorSources = simpliedError.errorSources;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simpliedError = (0, handleMongooseCastError_1.default)(error);
        statusCode = simpliedError.statusCode;
        message = simpliedError.message;
        errorSources = simpliedError.errorSources;
    }
    else if (((_a = error === null || error === void 0 ? void 0 : error.errorResponse) === null || _a === void 0 ? void 0 : _a.code) === 11000) {
        const simpliedError = (0, handleDuplicateError_1.default)(error);
        statusCode = simpliedError.statusCode;
        message = simpliedError.message;
        errorSources = simpliedError.errorSources;
    }
    else if (error instanceof AppError_1.default) {
        statusCode = error.statusCode;
        message = error.message;
        errorSources = [
            {
                path: '',
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    else if (error instanceof Error) {
        message = error.message;
        errorSources = [
            {
                path: '',
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        // error: error,
        errorSources,
        stack: config_1.default.NODE_ENV === 'development' ? error.stack : null,
    });
};
exports.default = globalErrorHandle;
