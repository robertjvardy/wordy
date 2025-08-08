import { useFetchCurrentGame } from "../../queries/gameQueries";

const Game = () => {
  const { data: current } = useFetchCurrentGame();
  console.log(current);
  return <div>Hello "/game/"!</div>;
};

export default Game;
