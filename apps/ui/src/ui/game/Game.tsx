import {
  useFetchAllGames,
  useFetchCurrentGame,
} from "../../queries/gameQueries";

const Game = () => {
  const { data: current } = useFetchCurrentGame();
  console.log(current);
  const { data } = useFetchAllGames();
  console.log(data);
  return <div>Hello "/game/"!</div>;
};

export default Game;
