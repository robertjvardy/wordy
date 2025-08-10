import { createRootRouteWithContext } from "@tanstack/react-router";
import type { RouterContext } from "../shared/types";
import PageLayout from "../ui/root/PageLayout";
import { initRequest } from "../queries/authQueries";
import { AuthDto } from "@repo/types/dtos";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: PageLayout,
  notFoundComponent: () => <div>404 Not Found</div>,
  beforeLoad: async () => {
    const data = await initRequest();
    const { authenticated, user } = AuthDto.parse(data);
    return { authenticated, user };
  },
});
