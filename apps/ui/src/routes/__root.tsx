import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import styles from "./styles.module.css";
import type { RouterContext } from "../shared/types";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <div className={styles.header}>
        <h1>Wordy</h1>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => <div>404 Not Found</div>,
});
