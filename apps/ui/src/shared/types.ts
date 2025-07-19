export type User = {
  id: string;
  username: string;
};

export interface RouterContext {
  user?: User;
}
