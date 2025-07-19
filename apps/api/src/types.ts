export type User = {
  id: string;
  username: string;
  password_hash: string;
  created_at: string;
};

export type Env = {
  Variables: {
    user: User;
  };
};
