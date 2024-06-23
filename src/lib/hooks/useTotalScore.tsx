"use client";
import { useQuery } from "@tanstack/react-query";
import { getTotal } from "../api/scores/queries";
import { GameId } from "../db/schema/games";

export const useTotalScores = (gameId: GameId) => {
  return useQuery({
    queryKey: ["totalScores"],
    queryFn: async () => await getTotal(gameId),
  });
};
