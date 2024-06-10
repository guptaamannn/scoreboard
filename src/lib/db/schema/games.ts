import { timestamps } from "@/lib/utils";
import { GameSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { getGameById, getGames } from "@/lib/api/games/queries";
import { playerSchema } from "./users";

const baseSchema = GameSchema.omit(timestamps);

export const insertGameSchema = baseSchema.omit({ id: true });
export const insertGameParams = baseSchema.extend({
    players: z.array(z.string()).min(2, "Must have at least 2 players"),
}).omit({
    id: true,
    creatorId: true,
    ended: true,
    hideOpponents: true,
    highestWins: true,
    showTotal: true
});

export const updateGameSchema = baseSchema;
export const updateGameParams = updateGameSchema.extend({
    players: z.array(playerSchema).min(2, "Must have at least 2 players"),
}).omit({

});

export const gameIdSchema = baseSchema.pick({ id: true });

export type Game = z.infer<typeof GameSchema>;
export type NewGame = z.infer<typeof insertGameSchema>;
export type NewGameParams = z.infer<typeof insertGameParams>;
export type UpdateGameParams = z.infer<typeof updateGameParams>;
export type GameId = z.infer<typeof gameIdSchema>["id"];

export type CompleteGame = Awaited<ReturnType<typeof getGames>>["games"][number];
export type GameById = Awaited<ReturnType<typeof getGameById>>["game"];