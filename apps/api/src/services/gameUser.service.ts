import { getCurrentGameQuery, getUserGamesQuery } from "@repo/db/queries";
import { UserGameDto, type UserGameDtoType } from "@repo/types/dtos";
import {
  readUserGameEntityFromDb,
  toUserGameDto,
  UserGameEntity,
} from "@repo/types/entities";
import { rootLogger } from "rootLogger.js";

const log = rootLogger.child({ module: "authService" });

const tempNewUserGameDto = {
  id: "",
  userId: "",
  gameId: "",
  isComplete: false,
  guesses: [null, null, null, null, null, null],
};

export const fetchAllGames = async (): Promise<UserGameDtoType[]> => {
  const games = await getUserGamesQuery();
  const gameDtos = games.map((game) => {
    const userGameEntity = UserGameEntity.parse(readUserGameEntityFromDb(game));
    return toUserGameDto(userGameEntity);
  });
  return gameDtos;
};

export const fetchCurrentGame = async (): Promise<UserGameDtoType> => {
  const game = await getCurrentGameQuery();
  if (game) {
    return toUserGameDto(UserGameEntity.parse(readUserGameEntityFromDb(game)));
  }

  // TODO create a service to fetch a new game in the event that the user has no unfinished games
  // the service logic is as follows:
  // - find a game for which there is no userGame for the current user
  // - if there are none, hit the word api service to fetch a new word and create a new game
  //  - then, create a new userGame with the current user and the new word
  return UserGameDto.parse(tempNewUserGameDto);
};
