import { getCurrentGameQuery, getUserGamesQuery } from "@repo/db/queries";
import {
  UserGameDto,
  type UserGameDtoType,
  type UserType,
} from "@repo/types/dtos";
import { toUserGameDto } from "@repo/types/entities";
import { logger } from "@repo/logger";

const log = logger.child({ module: "authService" });

const tempNewUserGameDto = {
  id: "",
  userId: "",
  gameId: "",
  isComplete: false,
  guesses: [null, null, null, null, null, null],
};

export const fetchAllGames = async (
  user: UserType
): Promise<UserGameDtoType[]> => {
  const games = await getUserGamesQuery(user.id);
  return games.map((game) => toUserGameDto(game));
};

export const fetchCurrentGame = async (
  user: UserType
): Promise<UserGameDtoType> => {
  const game = await getCurrentGameQuery(user.id);
  if (game) {
    return toUserGameDto(game);
  }

  log.info(`No unplayed game for user: ${user.id}`);

  // TODO create a service to fetch a new game in the event that the user has no unfinished games
  // the service logic is as follows:
  // - find a game for which there is no userGame for the current user
  // - if there are none, hit the word api service to fetch a new word and create a new game
  //  - then, create a new userGame with the current user and the new word
  return UserGameDto.parse(tempNewUserGameDto);
};
