import { pino } from "pino";

export const logger = pino({
  level: "debug",
  serializers: {
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
  },
});
