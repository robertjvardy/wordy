import {
  readUserGameEntityFromDb,
  UserGameEntity,
  type UserGameEntityType,
} from "@repo/types/entities";
import { query } from "../client.js";

export async function getUserGamesQuery(logger: any) {
  const res = await query<UserGameEntityType>(
    logger,
    // TODO add user_id where clause
    "SELECT user_game.id AS id, user_game.wordy_user_id, user_game.is_complete, user_game.first_guess, user_game.second_guess, user_game.third_guess, user_game.fourth_guess, user_game.fifth_guess, user_game.sixth_guess, game.id AS game_id, game.word FROM user_game JOIN game ON user_game.game_id = game.id;"
  );
  return res.rows.map((row) =>
    UserGameEntity.parse(readUserGameEntityFromDb(row))
  );
}

export async function getCurrentGameQuery(logger: any, userId: string) {
  const res = await query<UserGameEntityType>(
    logger,
    "SELECT * FROM user_game where user_game.is_complete = false and user_game.wordy_user_id = $1;",
    [userId]
  );
  if (res.rows[0]) {
    return UserGameEntity.parse(readUserGameEntityFromDb(res.rows[0]));
  }
  return null;
}
