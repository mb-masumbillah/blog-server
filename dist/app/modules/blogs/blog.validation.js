"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = void 0;
const zod_1 = require("zod");
const blogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        content: zod_1.z.string({ required_error: 'Content is required' }),
    }),
});
const updateblogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }).optional(),
        content: zod_1.z.string({ required_error: 'Content is required' }).optional(),
    }),
});
exports.blogValidation = {
    blogValidationSchema,
    updateblogValidationSchema,
};
