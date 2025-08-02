import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "./styles.module.css";
import { useAuth } from "../auth/AuthProvider";
import { http } from "../module/http";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { authenticated } = useAuth();
  const testApi = async () => {
    await http.get("/users/userInfo");
  };

  return (
    <>
      <h2>Welcome to the wordle knockoff!</h2>

      <div className={styles["links-container"]}>
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
      </div>
    </>
  );
}
