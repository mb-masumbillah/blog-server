"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const handleMongooseCastError = (error) => {
    const statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const errorSources = [
        {
            path: error === null || error === void 0 ? void 0 : error.path,
            message: error === null || error === void 0 ? void 0 : error.message,
        },
    ];
    return {
        statusCode,
        message: 'CastError',
        errorSources,
    };
};
exports.default = handleMongooseCastError;
