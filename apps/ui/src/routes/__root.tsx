import {
  createRootRouteWithContext,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { RouterContext } from "../shared/types";
import { useAuth } from "../auth/AuthProvider";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

const PageLayout = () => {
  const { logout, authenticated } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    logout();
    await navigate({ to: "/" });
  };
  return (
    <Box
      sx={{
        margin: "0 auto",
        maxWidth: "900px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" sx={{ margin: "0.5rem 0" }}>
          Wordy
        </Typography>
        {/* TODO make this an avatar that the user can click on to expand a user profile menu */}
        {authenticated ? (
          <Button onClick={handleLogout} variant="text">
            logout
          </Button>
        ) : null}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
    </Box>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: PageLayout,
  notFoundComponent: () => <div>404 Not Found</div>,
});
