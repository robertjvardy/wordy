import type { User } from "@repo/types/entities";
import { db } from "../client.js";

// TODO create a try catch wrapper

export async function getUsersQuery() {
  const res = await db.query<User>("SELECT * FROM game_user");
  return res.rows;
}

export async function getUserByIdQuery(id: string) {
  const res = await db.query<User>("SELECT * FROM game_user WHERE id = $1", [
    id,
  ]);
  return res.rows[0] ?? null;
}

export async function getUserByUsernameQuery(username: string) {
  const res = await db.query<User>(
    "SELECT * FROM game_user WHERE username = $1",
    [username.toLowerCase()]
  );
  return res.rows[0] ?? null;
}

export async function createUserQuery(username: string, password: string) {
  await db.query<User>(
    "INSERT INTO game_user (username, password_hash) values ($1, $2)",
    [username.toLowerCase(), password]
  );
}
