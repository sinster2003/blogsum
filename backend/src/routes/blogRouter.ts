import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono, Next } from "hono";
import { Context } from "hono";
import { verify } from "hono/jwt";
import { blogObject, updateBlogObject } from "@sinster2003/blogsum-zod-types";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string
  }
}>();

// middlewares ---> route protection
blogRouter.use(async (c: Context, next: Next) => {
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
});

blogRouter.post("/", async (c) => {
  const authorId = c.get("userId"); 
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  // zod
  try {
    const body = await c.req.json();
    const { success } = blogObject.safeParse(body);
    if(!success) {
     c.status(400);
     return c.json({
      message: "Invalid inputs"
     }) 
    }

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        authorId,
      },
    });

    return c.json({
      blog,
    });
  } catch (error) {
    c.status(500);
    c.json({
      message: "Something went wrong when posting the blog",
    });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  // zod
  try {
    const body = await c.req.json();
    const { success } = updateBlogObject.safeParse(body);
    if(!success) {
     c.status(400);
     return c.json({
      message: "Invalid inputs"
     }) 
    }

    const updatedBlog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      updatedBlog,
    });
  } catch (error) {
    c.status(500);
    c.json({
      message: "Something went wrong when updating the blog",
    });
  }
});

blogRouter.get("/bulk", async (c) => {
    const { currentPage, itemsPerPage }: Record<string, string> = c.req.query();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    // zod
    try {
      const blogs = await prisma.post.findMany({});
  
      if (!blogs.length) {
        c.status(404);
        return c.json({
          message: "Blogs not found",
        });
      }
  
      // pagination
      if (Number(currentPage) < 1 || Number(itemsPerPage) < 1) {
        c.status(400);
        return c.json({
          message: "Invalid queries",
        });
      }
  
      const totalPages = blogs.length / Number(itemsPerPage);
      const updatedBlogs = blogs.slice(
        (Number(currentPage) - 1) * Number(itemsPerPage),
        Number(itemsPerPage) * Number(currentPage)
      );
  
      return c.json({
        blogs: updatedBlogs,
        totalPages,
      });
    } catch (error) {
      c.status(500);
      c.json({
        message: "Something went wrong when finding the blog",
      });
    }
  });  

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // zod
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    if (!blog) {
      c.status(404);
      return c.json({
        message: "Blog not found",
      });
    }

    return c.json({
      blog,
    });
  } catch (error) {
    c.status(500);
    c.json({
      message: "Something went wrong when finding the blog",
    });
  }
});