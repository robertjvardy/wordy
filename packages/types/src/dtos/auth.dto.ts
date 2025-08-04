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

export const User = z.object({
  username: z.string(),
  id: z.uuid(),
});

export type UserType = z.infer<typeof User>;

export const AuthDto = z.object({
  token: z.string().optional(),
  authenticated: z.boolean(),
  user: User.optional(),
});

export type AuthDtoType = z.infer<typeof AuthDto>;
