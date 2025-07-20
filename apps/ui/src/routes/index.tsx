import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "./styles.module.css";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <h2>Welcome to the wordle knockoff!</h2>

      <div className={styles["links-container"]}>
        {/* <Link to="/about">About</Link>
        <Link to="/game">Game</Link> */}
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
