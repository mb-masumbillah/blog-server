"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const handleZodError = (error) => {
    const statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR || 500;
    const errorSources = error.issues.map((issues) => {
        return {
            path: issues.path[(issues === null || issues === void 0 ? void 0 : issues.path.length) - 1],
            message: issues.message,
        };
    });
    return {
        statusCode,
        message: 'Zod Validation Error',
        errorSources,
    };
};
exports.default = handleZodError;
