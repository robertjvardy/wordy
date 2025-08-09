import { Hono } from "hono";
import type { Env } from "types.js";
import { fetchAllGames, fetchCurrentGame } from "services/userGame.service.js";
import type { UserGameDtoType } from "@repo/types/dtos";

const app = new Hono<Env>();

app.get("/", async (c) => {
  const games = await fetchAllGames();
  return c.json<UserGameDtoType[]>(games);
});

app.get("/current", async (ctx) => {
  const currentGame = await fetchCurrentGame(ctx.var.user);
  return ctx.json<UserGameDtoType>({ ...currentGame });
});

export default app;
