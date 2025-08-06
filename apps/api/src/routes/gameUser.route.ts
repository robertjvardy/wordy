import { Hono } from "hono";
import type { Env } from "types.js";
import { fetchAllGames, fetchCurrentGame } from "services/gameUser.service.js";
import type { UserGameDtoType } from "@repo/types/dtos";

const app = new Hono<Env>();

app.get("/", async (c) => {
  const games = await fetchAllGames();
  return c.json<UserGameDtoType[]>(games);
});

app.get("/current", async (c) => {
  const currentGame = await fetchCurrentGame();
  return c.json<UserGameDtoType>({ ...currentGame });
});

export default app;
