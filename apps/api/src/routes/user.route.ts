import { getUserByIdQuery } from "@repo/db/queries";
import { resourceNotFound } from "exceptions.js";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import type { Env } from "types.js";

const app = new Hono<Env>();

app.get("/userInfo", async (c) => {
  const user = c.get("user");
  //   TODO move to user service
  const userInfo = await getUserByIdQuery(user.id);

  if (!userInfo) {
    throw new HTTPException(404, {
      res: resourceNotFound,
      message: "User Not Found",
    });
  }
  return c.json({ ...userInfo });
});

export default app;
