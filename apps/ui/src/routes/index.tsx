import { createFileRoute } from "@tanstack/react-router";
import { http } from "../module/http";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const handlePrivate = async () => {
    const { data } = await http.get("/private");
    console.log(data);
  };
  const handlePublic = async () => {
    const { data } = await http.get("/public");
    console.log(data);
  };
  return (
    <>
      <div>
        <button onClick={handlePublic}>Public</button>
        <button onClick={handlePrivate}>Private</button>
      </div>
    </>
  );
}
