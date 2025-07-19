import type { Env } from "types.js";
import { createMiddleware } from "hono/factory";
import { rootLogger } from "rootLogger.js";

const logger = rootLogger.child({
  module: "securityMiddleware",
});

const dummyUser = {
  username: "Rob",
  id: "1",
  password_hash: "test",
  created_at: "",
};

const publicPaths = ["/auth"];

const isPublicPath = (req: string) =>
  publicPaths.some((publicPath) => req.startsWith(`/api${publicPath}`));

const securityMiddleware = createMiddleware<Env>(async (ctx, next) => {
  if (isPublicPath(ctx.req.path)) {
    await next();
    return;
  }

  // TODO find header and confirm valid jwt for auth

  ctx.set("user", dummyUser);
  logger.info({ message: "Private Path" });
  await next();
});

export default securityMiddleware;
