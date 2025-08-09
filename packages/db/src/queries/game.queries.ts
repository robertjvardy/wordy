import { GameEntity, type GameEntityType } from "@repo/types/entities";
import { query } from "../client.js";

export const createGameQuery = async (
  log: any,
  word: string
): Promise<GameEntityType> => {
  const res = await query<GameEntityType>(
    log,
    "INSERT INTO game (word) values ($1) RETURNING *",
    [word.toLowerCase()]
  );
  return GameEntity.parse(res.rows[0]);
};
