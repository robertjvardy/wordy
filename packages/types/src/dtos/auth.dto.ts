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

export type User = {
  id: string;
  username: string;
};

// TODO create zod object for this and then validate in TODOs
export type InitDto = {
  token?: string;
  authenticated: boolean;
  user?: User;
};
