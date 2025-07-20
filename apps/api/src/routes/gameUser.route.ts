import { Hono } from "hono";
import type { Env } from "types.js";
import { getUsersQuery, getUserByIdQuery } from "@repo/db/queries";
import { HTTPException } from "hono/http-exception";
import { resourceNotFound } from "exceptions.js";

const app = new Hono<Env>();

app.get("/", async (c) => {
  try {
    const users = await getUsersQuery();
    console.log(c.get("user"));
    return c.json({ users: users });
  } catch (e: any) {
    console.log(e);
  }
});

app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const user = await getUserByIdQuery(id);
    if (!user) {
      throw new HTTPException(404, { res: resourceNotFound });
    }
    return c.json({ user: user });
  } catch (e: any) {
    console.log(e);
  }
});

export default app;
