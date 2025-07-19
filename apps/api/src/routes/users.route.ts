import { Hono } from "hono";
import type { Env } from "types.js";
import { getUsers } from "@repo/db";

const app = new Hono<Env>();

app.get("/", async (c) => {
  try {
    const users = await getUsers();
    return c.json({ message: users.map((user) => user.username).join(",") });
  } catch (e: any) {
    console.log(e);
  }
});

export default app;
