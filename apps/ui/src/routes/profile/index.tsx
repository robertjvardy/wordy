import { createFileRoute, redirect } from "@tanstack/react-router";
import Profile from "../../ui/profile/Profile";

export const Route = createFileRoute("/profile/")({
  component: Profile,
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
