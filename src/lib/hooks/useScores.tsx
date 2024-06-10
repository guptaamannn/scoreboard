"use client";

import { useQuery } from "@tanstack/react-query";
import { GameId } from "../db/schema/games";
import { getScores } from "../api/scores/queries";

export const useScores = (gameId: GameId) => {
  return useQuery({
    queryKey: ["scores"],
    queryFn: async () => await getScores(gameId),
  });
};
