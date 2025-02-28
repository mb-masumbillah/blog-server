"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const handleDuplicateError = (error) => {
    const statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR || 500;
    const match = error === null || error === void 0 ? void 0 : error.message.match(/name: "([^"]+)"/);
    const extracted_msg = match && match[1];
    const errorSources = [
        {
            path: '',
            message: `/${extracted_msg}/ is exist`,
        },
    ];
    return {
        statusCode,
        message: 'Duplicate Error',
        errorSources,
    };
};
exports.default = handleDuplicateError;
