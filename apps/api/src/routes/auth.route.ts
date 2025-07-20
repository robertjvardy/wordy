import { Hono } from "hono";
import { authenticateUser, createUser } from "services/auth.service.js";
import type { Env } from "types.js";
import { CreateUserRequest, LoginRequest } from "@repo/types/dtos";
import { generateJWT } from "utils/jtw.js";

const app = new Hono<Env>();

app.post("/login", async (c) => {
  const body = await c.req.json();

  const { username, password } = LoginRequest.parse(body);
  const user = await authenticateUser(username, password);

  const token = await generateJWT({ id: user.id, username: user.username });
  return c.json({ token });
});

app.post("/createUser", async (c) => {
  const body = await c.req.json();

  const { username, password } = CreateUserRequest.parse(body);
  await createUser(username, password);
  return c.json({ message: `Created user: ${username}` });
});

export default app;
