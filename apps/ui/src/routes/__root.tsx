import { createRootRouteWithContext } from "@tanstack/react-router";
import type { RouterContext } from "../shared/types";
import PageLayout from "../ui/root/PageLayout";
import queryClient from "../module/queryClient";
import { authQueryKeys } from "../queries/authQueries";
import type { AuthDtoType } from "@repo/types/dtos";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: PageLayout,
  notFoundComponent: () => <div>404 Not Found</div>,
  loader: async () => {
    const authData: AuthDtoType = await queryClient.ensureQueryData({
      queryKey: authQueryKeys.init,
    });
    return { authenticated: authData.authenticated, user: authData.user };
  },
});
