import type { UserType } from "@repo/types/dtos";

export interface RouterContext {
  user: UserType | null;
  authenticated: boolean;
}

export type AuthContextValue = RouterContext & {
  logout: () => void;
  login: (user: UserType, token: string) => void;
};
