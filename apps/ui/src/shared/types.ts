import type { User } from "@repo/types/dtos";

export interface RouterContext {
  user: User | null;
  authenticated: boolean;
}

export type AuthContextValue = RouterContext & {
  logout: () => void;
  login: (user: User, token: string) => void;
};
