import z from "zod";
import type { UserGameDtoType } from "../dtos/userGame.dto.js";

export const UserGameEntity = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  gameId: z.uuid(),
  isComplete: z.boolean(),
  firstGuess: z.string().nullable(),
  secondGuess: z.string().nullable(),
  thirdGuess: z.string().nullable(),
  fourthGuess: z.string().nullable(),
  fifthGuess: z.string().nullable(),
  sixthGuess: z.string().nullable(),
});

export type UserGameEntityType = z.infer<typeof UserGameEntity>;

export const readUserGameEntityFromDb = (raw: Record<string, any>) => {
  return UserGameEntity.parse({
    id: raw.id,
    userId: raw.wordy_user_id,
    gameId: raw.game_id,
    isComplete: raw.is_complete,
    firstGuess: raw.first_guess,
    secondGuess: raw.second_guess,
    thirdGuess: raw.third_guess,
    fourthGuess: raw.fourth_guess,
    fifthGuess: raw.fifth_guess,
    sixthGuess: raw.sixth_guess,
  });
};

export const toUserGameDto = (entity: UserGameEntityType): UserGameDtoType => {
  return {
    id: entity.id,
    userId: entity.userId,
    gameId: entity.gameId,
    isComplete: entity.isComplete,
    guesses: [
      entity.firstGuess,
      entity.secondGuess,
      entity.thirdGuess,
      entity.fourthGuess,
      entity.fifthGuess,
      entity.sixthGuess,
    ],
  };
};
