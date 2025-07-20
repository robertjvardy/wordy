import { z } from "zod";

export const LoginRequest = z.object({
  username: z.string(),
  password: z.string(),
});

export const CreateUserRequest = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginRequestType = z.infer<typeof LoginRequest>;
export type CreateUserRequestType = z.infer<typeof CreateUserRequest>;
