import { serve } from "@hono/node-server";
import { app } from "app.js";
import { rootLogger } from "rootLogger.js";

const PORT = parseInt(process.env.port ?? "5000");

const server = serve({ fetch: app.fetch, port: PORT }, (info) => {
  rootLogger.info(`Server is running on http://localhost:${info.port}`);
});

// graceful shutdown
process.on("SIGINT", () => {
  server.close();
  process.exit(0);
});
process.on("SIGTERM", () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
