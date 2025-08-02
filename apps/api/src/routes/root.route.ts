import { Hono } from "hono";
import type { Env } from "types.js";

const app = new Hono<Env>();

export default app;
