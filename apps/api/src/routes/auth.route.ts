import { Hono } from "hono";
import type { Env } from "types.js";

const app = new Hono<Env>();

app.get("/login", (c) => {
  return c.json({ message: "auth" });
});

app.get("/createAccount", (c) => {
  return c.json({ message: "auth" });
});

export default app;
