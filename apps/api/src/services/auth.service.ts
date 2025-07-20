import { createUserQuery, getUserByUsernameQuery } from "@repo/db/queries";
import {
  authenticationError,
  userAlreadyExists,
  resourceNotFound,
} from "exceptions.js";
import { HTTPException } from "hono/http-exception";
import { rootLogger } from "rootLogger.js";

const log = rootLogger.child({ module: "authService" });

export const createUser = async (username: string, password: string) => {
  const res = await getUserByUsernameQuery(username);
  if (res) {
    throw new HTTPException(409, { res: userAlreadyExists });
  }

  await createUserQuery(username, password);
  log.info(`User ${username} created`);
};

export const authenticateUser = async (username: string, password: string) => {
  const res = await getUserByUsernameQuery(username);
  if (!res) {
    throw new HTTPException(404, { res: resourceNotFound });
  }
  if (res?.password_hash !== password) {
    throw new HTTPException(403, { res: authenticationError });
  }
  log.info(`Authenticated user ${res.id}`);

  return res;
};
