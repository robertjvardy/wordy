import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "../auth/AuthProvider";
import { http } from "../module/http";
import { Box, Typography } from "@mui/material";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { authenticated } = useAuth();
  const testApi = async () => {
    await http.get("/users/userInfo");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      <Typography
        variant="h5"
        display="inline"
        textAlign="center"
        marginBottom="5rem"
      >
        Welcome to the wordle knockoff!
      </Typography>

      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <Link to="/about">About</Link>
        {authenticated ? (
          <>
            <Link to="/game">To Game</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
        {/* TODO verify and remove this */}
        <button onClick={testApi}>Authentication</button>
      </Box>
    </Box>
  );
}
