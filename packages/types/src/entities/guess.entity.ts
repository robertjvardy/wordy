import z from "zod";

export const GuessEntity = z.object({
  id: z.uuid(),
  wordy_user_id: z.uuid(),
  user_game_id: z.uuid(),
  guess: z.string(),
  result: z.string(),
  index: z.number(),
});

export type GuessEntityType = z.infer<typeof GuessEntity>;
