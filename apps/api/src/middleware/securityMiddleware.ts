import type { Env, User } from "types.js";
import { createMiddleware } from "hono/factory";
import { rootLogger } from "rootLogger.js";
import { verifyJWT } from "utils/jtw.js";

const logger = rootLogger.child({
  module: "securityMiddleware",
});

const publicPaths = ["/auth"];

const isPublicPath = (req: string) =>
  publicPaths.some((publicPath) => req.startsWith(`/api${publicPath}`));

const securityMiddleware = createMiddleware<Env>(async (ctx, next) => {
  if (isPublicPath(ctx.req.path)) {
    await next();
    return;
  }
  const auth = ctx.req.header("Authorization");
  const token = auth?.split(" ")[1];

  if (!token) return ctx.json({ message: "Missing token" }, 401);

  const payload = await verifyJWT(token);
  if (!payload) {
    logger.warn(`Missing token for request: ${ctx.req.url}`);
    return ctx.json({ message: "Invalid token" }, 401);
  }

  ctx.set("user", { username: payload.username, id: payload.id } as User);
  await next();
});

export default securityMiddleware;
