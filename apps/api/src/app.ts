import { errorHandler } from "errorHandler.js";
import { Hono } from "hono";
import { logger } from "hono/logger";
import securityMiddleware from "middleware/securityMiddleware.js";
import { rootLogger } from "rootLogger.js";
import root from "routes/root.route.js";
import auth from "routes/auth.route.js";
import type { Env } from "types.js";

export const app = new Hono<Env>().basePath("/api");

const log = rootLogger.child({ module: "requestLogger" });

// Middleware
// TODO investigate build in middlewares
// I think this is logging every incoming request
app.use(
  logger((str, ...rest) => {
    log.info(str, ...rest);
  })
);
app.use("*", securityMiddleware);

// error handler
app.onError(errorHandler);

// routes
app.route("/auth", auth);
app.route("/", root);
