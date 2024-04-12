import zod from "zod";

// backend
export const signupObject = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    username: zod.string().min(2),
    password: zod.string().min(6),
}).required();

export const signinObject = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
}).required();

export const blogObject = zod.object({
    title: zod.string().min(3),
    content: zod.string().min(20),
    published: zod.boolean(),
}).required();

export const updateBlogObject = zod.object({
    title: zod.string().min(3),
    content: zod.string().min(10),
    id: zod.string(),
}).required();

// type inference ---> frontend
export type signupTypes = zod.infer<typeof signupObject>
export type signinTypes = zod.infer<typeof signinObject>
export type updateBlogTypes = zod.infer<typeof updateBlogObject>
export type blogTypes = zod.infer<typeof blogObject>