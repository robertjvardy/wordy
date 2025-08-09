import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "@repo/logger";
import type { Env } from "types.js";
import { z, ZodError } from "zod";

const log = logger.child({ module: "requestError" });

export const errorHandler: ErrorHandler<Env> = (err, c) => {
  log.error(err);

  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  if (err instanceof ZodError) {
    return c.json(
      {
        message: z.prettifyError(err),
      },
      400
    );
  }

  return c.json(
    {
      message: "Unknown Error",
    },
    500
  );
};
