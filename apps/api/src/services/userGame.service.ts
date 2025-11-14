import {
  getCurrentGameQuery,
  getGuessesForGame,
  getUserGamesQuery,
} from "@repo/db/queries";
import {
  UserGameDto,
  type UserGameDtoType,
  type UserType,
} from "@repo/types/dtos";
import { toUserGameDto } from "@repo/types/dtos";
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
  const userGames = await getUserGamesQuery(user.id);
  // TODO add this to the getCurrentGame Query with a join
  // probably want server side pagination
  return Promise.all(
    userGames.map(async (game) => {
      const guesses = await getGuessesForGame(user.id, game.id);
      return toUserGameDto(game, guesses);
    })
  );
};

export const fetchCurrentGame = async (
  user: UserType
): Promise<UserGameDtoType> => {
  const userGame = await getCurrentGameQuery(user.id);
  if (userGame) {
    // TODO add this to the getCurrentGame Query with a join
    const guesses = await getGuessesForGame(user.id, userGame.id);
    return toUserGameDto(userGame, guesses);
  }

  log.info(`No unplayed game for user: ${user.id}`);

  // TODO create a service to fetch a new game in the event that the user has no unfinished games
  // the service logic is as follows:
  // - find a game for which there is no userGame for the current user
  // - if there are none, hit the word api service to fetch a new word and create a new game
  //  - then, create a new userGame with the current user and the new word
  return UserGameDto.parse(tempNewUserGameDto);
};
