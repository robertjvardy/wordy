import { pino } from "pino";

export const rootLogger = pino({
  level: "debug",
  serializers: {
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
  },
});
