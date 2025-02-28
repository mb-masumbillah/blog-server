"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationSchema = void 0;
const zod_1 = require("zod");
exports.loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .email('Invalid email')
            .min(1, 'Email is Required')
            .refine((val) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val), { message: 'Email must be unique ? => example@domain.com' }),
        password: zod_1.z
            .string()
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password must not exceed 20 characters'),
    }),
});
