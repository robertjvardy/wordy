import z from "zod";

export const UserGameEntity = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  gameId: z.uuid(),
  isComplete: z.boolean(),
});

export type UserGameEntityType = z.infer<typeof UserGameEntity>;

export const readUserGameEntityFromDb = (raw: Record<string, any>) => {
  return UserGameEntity.parse({
    id: raw.id,
    userId: raw.wordy_user_id,
    gameId: raw.game_id,
    isComplete: raw.is_complete,
  });
};
