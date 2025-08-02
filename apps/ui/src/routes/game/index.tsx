import { createFileRoute, redirect } from "@tanstack/react-router";

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
  return <div>Hello "/game/"!</div>;
}
