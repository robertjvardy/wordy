import z from "zod";

export const UserGameDto = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  gameId: z.uuid(),
  isComplete: z.boolean(),
  guesses: z.array(z.string().nullable()).length(6),
});

export type UserGameDtoType = z.infer<typeof UserGameDto>;
