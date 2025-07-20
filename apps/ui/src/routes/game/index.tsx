import { createFileRoute, redirect } from "@tanstack/react-router";

const isAuthenticated = () => localStorage.getItem("token");

export const Route = createFileRoute("/game/")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    // if (!isAuthenticated()) {
    if (true) {
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
