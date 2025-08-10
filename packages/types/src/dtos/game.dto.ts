import z from "zod";
import type { UserGameEntityType, GuessEntityType } from "../entities";

export const GuessDto = z.object({
  id: z.uuid(),
  index: z.number(),
  guess: z.string(),
  result: z.string(),
});

export type GuessDtoType = z.infer<typeof GuessDto>;

export const UserGameDto = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  gameId: z.uuid(),
  isComplete: z.boolean(),
  guesses: z.array(GuessDto.nullable()).length(6),
});

export type UserGameDtoType = z.infer<typeof UserGameDto>;

export const toUserGameDto = (
  gameEntity: UserGameEntityType,
  guessEntities: GuessEntityType[]
): UserGameDtoType => {
  return {
    id: gameEntity.id,
    userId: gameEntity.userId,
    gameId: gameEntity.gameId,
    isComplete: gameEntity.isComplete,
    guesses: guessEntities.map((guessEntity) => ({
      id: guessEntity.id,
      index: guessEntity.index,
      guess: guessEntity.guess,
      result: guessEntity.result,
    })),
  };
};
