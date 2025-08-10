import {
  readUserGameEntityFromDb,
  UserGameEntity,
  type UserGameEntityType,
} from "@repo/types/entities";
import { query } from "../client.js";

export async function getUserGamesQuery(userId: string) {
  const res = await query<UserGameEntityType>(
    "SELECT user_game.id AS id, user_game.wordy_user_id, user_game.is_complete, game.id AS game_id, game.word FROM user_game JOIN game ON user_game.game_id = game.id where user_game.wordy_user_id = $1;",
    [userId]
  );
  return res.rows.map((row) =>
    UserGameEntity.parse(readUserGameEntityFromDb(row))
  );
}

export async function getCurrentGameQuery(userId: string) {
  const res = await query<UserGameEntityType>(
    "SELECT * FROM user_game where user_game.is_complete = false and user_game.wordy_user_id = $1;",
    [userId]
  );
  if (res.rows[0]) {
    return UserGameEntity.parse(readUserGameEntityFromDb(res.rows[0]));
  }
  return null;
}
