import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div>
      <h2>About Wordy</h2>
      <div>If you've played wordle... you know what this is </div>
    </div>
  );
}
