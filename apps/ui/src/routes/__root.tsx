import { createRootRouteWithContext } from "@tanstack/react-router";
import type { RouterContext } from "../shared/types";
import PageLayout from "../ui/root/PageLayout";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: PageLayout,
  notFoundComponent: () => <div>404 Not Found</div>,
});
