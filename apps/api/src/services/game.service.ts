import { createGameQuery } from "@repo/db/queries";
import queryLogger from "loggers/query.js";

export const createGame = async () => {
  // TODO fetch new word from word api (set random to true)
  const word = "wordy";
  // TODO validate that word is of length 5
  // TODO validate the word doesnt already exist in the db
  const res = await createGameQuery(queryLogger, word);
  return res;
};
