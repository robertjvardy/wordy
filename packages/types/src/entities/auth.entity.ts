import z from "zod";

export const UserEntity = z.object({
  username: z.string(),
  id: z.uuid(),
  password_hash: z.string(),
  created_at: z.date(),
});

export type UserEntityType = z.infer<typeof UserEntity>;
