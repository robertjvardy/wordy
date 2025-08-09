import { Pool } from "pg";
import dotenv from "dotenv";
import type { QueryInputTypes } from "@repo/types";
import { formatPgQuery } from "./utils.js";
import { logger } from "@repo/logger";

dotenv.config();

const log = logger.child({ module: "dbConnection" });

const PORT = parseInt(process.env.DB_PORT ?? "5432");

export const db = new Pool({
  port: PORT,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

db.on("error", (err) => {
  log.error("Unexpected PG Pool Error:", err);
});

export const query = async <T>(
  queryString: string,
  params?: QueryInputTypes[]
) => {
  try {
    log.info(`executing query: ${formatPgQuery(queryString, params)}`);
    return db.query<T[]>(queryString, params);
  } catch (err) {
    throw err;
  }
};
