import { GuessEntity } from "@repo/types/entities";
import { query } from "../client.js";

export const getGuessesForGame = async (userId: string, userGameId: string) => {
  const res = await query(
    "select * from user_game ug " +
      "join guess g ON ug.id = g.user_game_id " +
      "join game ga ON ug.game_id = ga.id " +
      "where ug.wordy_user_id = $1 " +
      "and ug.id = $2",
    [userId, userGameId]
  );
  return res.rows.map((row) => GuessEntity.parse(row));
};

export const getGuessesForGames = async (
  userId: string,
  userGameIds: string[]
) => {
  const queryList = userGameIds.join(",");
  const res = await query(
    "select * from user_game ug " +
      "join guess g ON ug.id = g.user_game_id " +
      "join game ga ON ug.game_id = ga.id " +
      "where ug.wordy_user_id = $1 " +
      "and ug.id in ($2)",
    [userId, queryList]
  );
  return res.rows.map((row) => GuessEntity.parse(row));
};
