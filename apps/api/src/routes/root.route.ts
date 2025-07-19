import { Hono } from "hono";
import type { Env } from "types.js";

const app = new Hono<Env>();

app.get("/", (c) => {
  return c.text(`Hello ${c.var.user.username}`);
});

export default app;
