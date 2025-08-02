import {
  createRootRouteWithContext,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import styles from "./styles.module.css";
import type { RouterContext } from "../shared/types";
import { useAuth } from "../auth/AuthProvider";

const PageLayout = () => {
  const { logout, authenticated } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    logout();
    await navigate({ to: "/" });
  };
  return (
    <>
      <div className={styles.header}>
        <h1>Wordy</h1>
        {/* TODO make this an avatar that the user can click on to expand a user profile menu */}
        {authenticated ? <button onClick={handleLogout}>logout</button> : null}
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: PageLayout,
  notFoundComponent: () => <div>404 Not Found</div>,
});
