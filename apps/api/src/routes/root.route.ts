import { Hono } from "hono";
import type { Env } from "types.js";

const app = new Hono<Env>();

app.get("/", (c) => {
  return c.text(`Hello ${c.var.user.username}`);
});

app.get("/public", (c) => {
  return c.json({ message: "public endpoint" });
});

app.get("/private", (c) => {
  return c.json({ message: "private endpoint" });
});

export default app;
