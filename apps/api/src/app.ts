import { errorHandler } from "errorHandler.js";
import { Hono } from "hono";
import { logger as honoLogger } from "hono/logger";
import securityMiddleware from "middleware/securityMiddleware.js";
import root from "routes/root.route.js";
import auth from "routes/auth.route.js";
import users from "routes/user.route.js";
import games from "routes/gameUser.route.js";
import type { Env } from "types.js";
import { cors } from "hono/cors";
import { logger } from "@repo/logger";

export const app = new Hono<Env>().basePath("/api");

const log = logger.child({ module: "requestLogger" });

// Middleware
app.use(
  "/api/*",
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(
  honoLogger((str, ...rest) => {
    log.info(str, ...rest);
  })
);
app.use("*", securityMiddleware);

// error handler
app.onError(errorHandler);

// routes
app.route("/games", games);
app.route("/auth", auth);
app.route("/users", users);
app.route("/", root);
