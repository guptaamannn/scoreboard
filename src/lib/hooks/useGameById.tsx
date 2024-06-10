"use client";
import { useQuery } from "@tanstack/react-query";
import { GameId } from "../db/schema/games";
import { getGameById } from "../api/games/queries";

export const useGameById = (gameId: GameId) => {
  return useQuery({
    queryKey: ["game", gameId],
    queryFn: async () => await getGameById(gameId),
    refetchInterval: 5000,
  });
};
