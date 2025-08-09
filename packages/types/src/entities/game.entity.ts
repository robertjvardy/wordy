import z from "zod";

export const GameEntity = z.object({
  id: z.uuid(),
  word: z.string(),
});

export type GameEntityType = z.infer<typeof GameEntity>;
