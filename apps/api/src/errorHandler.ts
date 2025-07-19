import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import type { Env } from "types.js";
import { z, ZodError } from "zod";

export const errorHandler: ErrorHandler<Env> = (err, c) => {
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
