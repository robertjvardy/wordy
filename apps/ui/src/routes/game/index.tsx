import { createFileRoute, redirect } from "@tanstack/react-router";
import Game from "../../ui/game/Game";

export const Route = createFileRoute("/game/")({
  component: Game,
  beforeLoad: async ({ context, location }) => {
    if (!context.authenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
