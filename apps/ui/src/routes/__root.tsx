import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { RouterContext } from "../shared/types";
import { useAuth } from "../auth/AuthProvider";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

const PageLayout = () => {
  const { logout, authenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    logout();
    await navigate({ to: "/" });
  };
  const matchUrlRoute = (route: string) => location.pathname.endsWith(route);

  return (
    <Box
      sx={{
        margin: "0 auto",
        maxWidth: "900px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "0 1rem",
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
        <Box>
          {!matchUrlRoute("/") && (
            <Link to="/">
              <Button>Home</Button>
            </Link>
          )}
          {authenticated ? (
            <Button onClick={handleLogout} variant="text">
              logout
            </Button>
          ) : (
            <>
              {!matchUrlRoute("login") && (
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              )}
              {!matchUrlRoute("signup") && (
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              )}
            </>
          )}
        </Box>
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
