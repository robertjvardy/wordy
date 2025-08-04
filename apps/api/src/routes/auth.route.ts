import { Hono } from "hono";
import { authenticateUser, createUser } from "services/auth.service.js";
import { Token, type Env } from "types.js";
import {
  CreateUserRequest,
  LoginRequest,
  type AuthDto,
} from "@repo/types/dtos";
import { generateJWT, verifyJWT } from "utils/jtw.js";
import { UserEntity } from "@repo/types/entities";

const app = new Hono<Env>();

app.post("/login", async (c) => {
  const body = await c.req.json();

  const { username, password } = LoginRequest.parse(body);
  const user = await authenticateUser(username, password);

  const token = await generateJWT({ id: user.id, username: user.username });
  return c.json<AuthDto>({
    token,
    authenticated: true,
    user: { username: user.username, id: user.id },
  });
});

app.post("/createUser", async (c) => {
  const body = await c.req.json();

  const { username, password } = CreateUserRequest.parse(body);
  const res = await createUser(username, password);

  const { username: dbUsername, id } = UserEntity.parse(res);
  const token = await generateJWT({ id: id, username: dbUsername });

  return c.json<AuthDto>({
    authenticated: true,
    user: { username: dbUsername, id },
    token,
  });
});

app.get("/init", async (c) => {
  const auth = c.req.header("Authorization");
  const token = auth?.split(" ")[1];
  if (!token) {
    return c.json<AuthDto>({ authenticated: false });
  }

  const payload = await verifyJWT(token);
  if (!payload) {
    return c.json<AuthDto>({ authenticated: false });
  }

  const { username, id } = Token.parse(payload);

  return c.json<AuthDto>({
    authenticated: true,
    user: { username, id },
  });
});

export default app;
