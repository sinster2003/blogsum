import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { encryptPassword } from "../utils/encryptPassword";
import { signupObject, signinObject } from "@sinster2003/blogsum-zod-types";
import authMiddleware from "../middlewares/auth";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const validation = signinObject.safeParse(body);
    if(!validation?.success) {
      c.status(400);
      return c.json({
        message: `${validation?.error?.issues[0].path[0]} Error: ${validation?.error?.issues[0]?.message}`
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: await encryptPassword(body.password),
      },
    });

    if (!user) {
      c.status(400);
      return c.json({
        message: "Invalid Credentials... Try Again",
      });
    }

    const token = await sign({ userId: user.id }, c.env.JWT_SECRET);

    return c.json(
      {
        jwt: token,
      },
      200
    );
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({
      message: "Something went wrong"
    });
  }
});

userRouter.post("/signup", async (c) => {
  // edge cloudflare environments
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  try {
    const body = await c.req.json(); // fetching body from frontend
    const validation = signupObject.safeParse(body);
    if(!validation?.success) {
      c.status(400);
      return c.json({
        message: `${validation?.error?.issues[0].path[0]} Error: ${validation?.error?.issues[0]?.message}`
      })
    }

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      return c.json(
        {
          message: "User already exists please login",
        },
        404
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        username: body.username,
        password: await encryptPassword(body.password),
      },
    });

    if (!newUser) {
      return c.json(
        {
          message: "Unsuccessful signup",
        },
        404
      );
    }

    const token = await sign({ userId: newUser.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token,
    });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ 
      message:"Something went wrong"
    });
  }
});

userRouter.get("/validate", authMiddleware, (c) => {
  c.status(200);
  return c.json({
    message: "Valid User"
  });
});