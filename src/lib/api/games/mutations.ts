"use server";

import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { GameId, gameIdSchema, insertGameParams, NewGameParams, updateGameParams, UpdateGameParams, updateGameSchema } from "@/lib/db/schema/games";


export const createGame = async (game: NewGameParams) => {
    const { session } = await getUserAuth();
    const newGame = insertGameParams.parse({ ...game, creatorId: session?.user.id! });
    try {
        const g = await db.game.create({
            data: {
                creatorId: session?.user.id!,
                description: newGame.description,
                players: {
                    connect: newGame.players.map((player) => ({ id: player })),
                }
            }
        });
        return { game: g };
    } catch (err) {
        const message = (err as Error).message ?? "Error, please try again";
        console.error(message);
        throw { error: message };
    }
};

export const updateGame = async (id: GameId, game: UpdateGameParams) => {
    const { session } = await getUserAuth();
    const { id: gameId } = gameIdSchema.parse({ id });
    const newGame = updateGameSchema.parse({ ...game, creatorId: session?.user.id! });
    try {
        const g = await db.game.update({ where: { id: gameId, creatorId: session?.user.id! }, data: newGame })
        return { game: g };
    } catch (err) {
        const message = (err as Error).message ?? "Error, please try again";
        console.error(message);
        throw { error: message };
    }
};


export const deleteGame = async (id: GameId) => {
    const { session } = await getUserAuth();
    const { id: gameId } = gameIdSchema.parse({ id });
    try {
        const g = await db.game.delete({ where: { id: gameId, creatorId: session?.user.id! } })
        return { game: g };
    } catch (err) {
        const message = (err as Error).message ?? "Error, please try again";
        console.error(message);
        throw { error: message };
    }
}