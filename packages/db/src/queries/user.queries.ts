import type { UserEntityType } from "@repo/types/entities";
import { db } from "../client.js";

// TODO create a try catch wrapper

export async function getUsersQuery() {
  const res = await db.query<UserEntityType>("SELECT * FROM wordy_user");
  return res.rows;
}

export async function getUserByIdQuery(id: string) {
  const res = await db.query<UserEntityType>(
    "SELECT * FROM wordy_user WHERE id = $1",
    [id]
  );
  return res.rows[0] ?? null;
}

export async function getUserByUsernameQuery(username: string) {
  const res = await db.query<UserEntityType>(
    "SELECT * FROM wordy_user WHERE username = $1",
    [username.toLowerCase()]
  );
  return res.rows[0] ?? null;
}

export async function createUserQuery(username: string, password: string) {
  const result = await db.query<UserEntityType>(
    "INSERT INTO wordy_user (username, password_hash) values ($1, $2) RETURNING *",
    [username.toLowerCase(), password]
  );
  return result.rows[0];
}
