"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogObject = exports.blogObject = exports.signinObject = exports.signupObject = void 0;
const zod_1 = __importDefault(require("zod"));
// backend
exports.signupObject = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    username: zod_1.default.string().min(2),
    password: zod_1.default.string().min(6),
});
exports.signinObject = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.blogObject = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    published: zod_1.default.boolean(),
});
exports.updateBlogObject = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.string(),
});
