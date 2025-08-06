import type { UserGameEntityType } from "@repo/types/entities";
import { db } from "../client.js";

export async function getUserGamesQuery() {
  const res = await db.query<UserGameEntityType[]>(
    "SELECT user_game.id AS user_game_id, user_game.wordy_user_id, user_game.is_complete, user_game.first_guess, user_game.second_guess, user_game.third_guess, user_game.fourth_guess, user_game.fifth_guess, user_game.sixth_guess, game.id AS game_id, game.word FROM user_game JOIN game ON user_game.game_id = game.id;"
  );
  return res.rows;
}

export async function getCurrentGameQuery() {
  const res = await db.query<UserGameEntityType>(
    "SELECT user_game.id AS user_game_id, user_game.wordy_user_id, user_game.is_complete, user_game.first_guess, user_game.second_guess, user_game.third_guess, user_game.fourth_guess, user_game.fifth_guess, user_game.sixth_guess, game.id AS game_id, game.word FROM user_game JOIN game ON user_game.game_id = game.id where user_game.is_complete = false;"
  );
  return res.rows[0] ?? null;
}
