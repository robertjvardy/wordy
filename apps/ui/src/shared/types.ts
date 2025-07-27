// TODO move this to dto
export type User = {
  id: string;
  username: string;
};

export interface RouterContext {
  user?: User;
}

export type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
};
