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
  login: (token: string) => void;
  logout: () => void;
};
