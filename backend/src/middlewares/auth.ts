import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export default async function authMiddleware(c: Context, next: Next) {
    const BearerToken = c.req.header("Authorization");
    const token = BearerToken?.split(" ")[1] || "";
    try {
      const { userId } = await verify(token, c.env.JWT_SECRET);
      console.log(userId);
      c.set("userId", userId);
      await next();
    } catch (error) {
      console.log(error);
      return c.json(
        {
          message: "Please Sign up",
        },
        400
      );
    }
  };
