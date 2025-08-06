import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  useFetchAllGames,
  useFetchCurrentGame,
} from "../../queries/gameQueries";

export const Route = createFileRoute("/game/")({
  component: RouteComponent,
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

function RouteComponent() {
  const { data } = useFetchAllGames();
  console.log(data);
  const { data: current } = useFetchCurrentGame();
  console.log(current);
  return <div>Hello "/game/"!</div>;
}
