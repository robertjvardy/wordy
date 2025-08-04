import { routeTree } from "../routeTree.gen";
import { createRouter } from "@tanstack/react-router";

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  context: {
    user: null,
    authenticated: false,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
