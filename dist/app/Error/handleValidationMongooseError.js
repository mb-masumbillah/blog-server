"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const handleMongooseError = (error) => {
    const statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR || 500;
    const errorSources = Object.values(error.errors).map((val) => {
        return {
            path: val === null || val === void 0 ? void 0 : val.path,
            message: val === null || val === void 0 ? void 0 : val.message,
        };
    });
    return {
        statusCode,
        message: 'ValidationError',
        errorSources,
    };
};
exports.default = handleMongooseError;
