import type { UserType } from "@repo/types/dtos";

export interface RouterContext {
  user: UserType | null;
  authenticated: boolean;
}
