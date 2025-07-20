import { errorHandler } from "errorHandler.js";
import { Hono } from "hono";
import { logger } from "hono/logger";
import securityMiddleware from "middleware/securityMiddleware.js";
import { rootLogger } from "rootLogger.js";
import root from "routes/root.route.js";
import auth from "routes/auth.route.js";
import users from "routes/gameUser.route.js";
import type { Env } from "types.js";
import { cors } from "hono/cors";

export const app = new Hono<Env>().basePath("/api");

const log = rootLogger.child({ module: "requestLogger" });

// Middleware
app.use(
  "/api/*",
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(
  logger((str, ...rest) => {
    log.info(str, ...rest);
  })
);
app.use("*", securityMiddleware);

// error handler
app.onError(errorHandler);

// routes
app.route("/users", users);
app.route("/auth", auth);
app.route("/", root);
