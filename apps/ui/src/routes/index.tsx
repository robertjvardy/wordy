import { createFileRoute, Link, useRouteContext } from "@tanstack/react-router";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { authenticated } = useRouteContext({ from: "/" });

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
        Welcome to the knockoff Wordle!
      </Typography>

      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {authenticated && (
          <>
            <Link to="/game">
              <Button variant="contained">Play</Button>
            </Link>
          </>
        )}
        <Box>
          <Typography variant="h4" gutterBottom>
            What is Wordy?
          </Typography>

          <Typography variant="body1">
            <strong>Wordy</strong> is a word puzzle game where players have six
            attempts to guess a secret five-letter word. After each guess, the
            game provides feedback:
          </Typography>

          <List dense>
            <ListItem>
              <ListItemText primary="🟩 Green: Correct letter in the correct position" />
            </ListItem>
            <ListItem>
              <ListItemText primary="🟨 Yellow: Correct letter in the wrong position" />
            </ListItem>
            <ListItem>
              <ListItemText primary="⬜ Gray: Letter not in the word at all" />
            </ListItem>
          </List>

          <Typography variant="body1">
            Once a player completes a game (by either guessing the word
            correctly or running out of attempts), they have the opportunity to
            compare their scores with their friends who have also completed the
            same word.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
