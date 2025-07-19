import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env.DB_PORT ?? "5432");

export const db = new Pool({
  port: PORT,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
