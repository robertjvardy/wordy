import type { User } from "types.js";
import { db } from "./client.js";

export async function getUsers() {
  const res = await db.query<User>("SELECT * FROM users");
  return res.rows;
}
