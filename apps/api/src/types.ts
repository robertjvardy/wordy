export type User = {
  id: string;
  username: string;
};

export type Env = {
  Variables: {
    user: User;
  };
};
