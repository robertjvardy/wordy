import { useQuery } from "@tanstack/react-query";
import { http } from "../module/http";
import type { UserGameDtoType } from "@repo/types/dtos";

const fetchGames = async () => {
  const { data } = await http.get("/games");
  return data;
};

export const useFetchAllGames = () =>
  useQuery<UserGameDtoType[]>({
    queryKey: ["games-all"],
    queryFn: fetchGames,
  });

const fetchCurrentGame = async () => {
  const { data } = await http.get("/games/current");
  return data;
};

export const useFetchCurrentGame = () =>
  useQuery<UserGameDtoType>({
    queryKey: ["games-current"],
    queryFn: fetchCurrentGame,
  });
