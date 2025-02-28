"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateToken = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CreateToken = (jwtPayload, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(jwtPayload, secret, { expiresIn: expiresIn });
};
exports.CreateToken = CreateToken;
