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
const express_1 = __importDefault(require("express"));
const globalErrorHandle_1 = __importDefault(require("./middleware/globalErrorHandle"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const Router_1 = __importDefault(require("./Router"));
const app = (0, express_1.default)();
// perser
app.use(express_1.default.json());
// route
app.use('/api', Router_1.default);
// test
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Blog Project server');
}));
// global error
app.use(globalErrorHandle_1.default);
// not Found
app.use(notFound_1.default);
exports.default = app;
