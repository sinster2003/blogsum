import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { blogObject, updateBlogObject } from "@sinster2003/blogsum-zod-types";
import authMiddleware from "../middlewares/auth";

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
blogRouter.use(authMiddleware);

blogRouter.post("/", async (c) => {
  const authorId = c.get("userId"); 
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  // zod
  try {
    const body = await c.req.json();
    const validation = blogObject.safeParse(body);

    if(!validation?.success) {
     c.status(400);
     return c.json({
      message: `${validation?.error?.issues[0].path[0]} Error: ${validation?.error?.issues[0]?.message}`
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
    const validation = updateBlogObject.safeParse(body);
    if(!validation?.success) {
     c.status(400);
     return c.json({
      message: `${validation?.error?.issues[0].path[0]} Error: ${validation?.error?.issues[0]?.message}`
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
      const blogs = await prisma.post.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          // join or populate similar to mongoose
          author: {
            select: {
              name: true
            }
          }
        }
      });
  
      if (!blogs.length) {
        c.status(200);
        return c.json({
          blogs: [],
          totalPages: null,
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
  
      const totalPages = Math.ceil(blogs.length / Number(itemsPerPage));
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
      select: {
        id: true,
        title: true,
        content: true,
        // join or populate similar to mongoose
        author: {
          select: {
            name: true
          }
        }
      }
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