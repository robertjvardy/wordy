import { Hono } from "hono";
import { authenticateUser, createUser } from "services/auth.service.js";
import type { Env } from "types.js";
import { CreateUserRequest, LoginRequest } from "@repo/types/dtos";
import { generateJWT, verifyJWT } from "utils/jtw.js";

const app = new Hono<Env>();

app.post("/login", async (c) => {
  const body = await c.req.json();

  const { username, password } = LoginRequest.parse(body);
  const user = await authenticateUser(username, password);

  const token = await generateJWT({ id: user.id, username: user.username });
  return c.json({
    token,
    authenticated: true,
    user: { username: user.username, id: user.id },
  });
});

app.post("/createUser", async (c) => {
  const body = await c.req.json();

  const { username, password } = CreateUserRequest.parse(body);
  await createUser(username, password);
  // TODO get the user info and send back a InitDto
  return c.json({ message: `Created user: ${username}` });
});

app.get("/init", async (c) => {
  const auth = c.req.header("Authorization");
  const token = auth?.split(" ")[1];
  if (!token) {
    return c.json({ authenticated: false });
  }

  const payload = await verifyJWT(token);
  if (!payload) {
    return c.json({ authenticated: false });
  }

  return c.json({
    authenticated: true,
    user: { username: payload.username, id: payload.id },
  });
});

export default app;
