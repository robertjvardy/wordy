import z from "zod";

type AuthContext = {
  user: { id: string; username: string };
};

export type Env = {
  Variables: AuthContext;
};

export const Token = z.object({
  username: z.string(),
  id: z.uuid(),
  iat: z.number(),
  exp: z.number(),
});

export type TokenType = z.infer<typeof Token>;
