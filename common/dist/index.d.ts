import zod from "zod";
export declare const signupObject: zod.ZodObject<{
    name: zod.ZodString;
    email: zod.ZodString;
    username: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    name: string;
    email: string;
    username: string;
    password: string;
}, {
    name: string;
    email: string;
    username: string;
    password: string;
}>;
export declare const signinObject: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const blogObject: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    published: zod.ZodBoolean;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
    published: boolean;
}, {
    title: string;
    content: string;
    published: boolean;
}>;
export declare const updateBlogObject: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    id: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export type signupTypes = zod.infer<typeof signupObject>;
export type signinTypes = zod.infer<typeof signinObject>;
export type updateBlogTypes = zod.infer<typeof updateBlogObject>;
export type blogTypes = zod.infer<typeof blogObject>;
