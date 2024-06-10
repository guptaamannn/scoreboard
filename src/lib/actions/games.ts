"use server";

import { revalidatePath } from "next/cache";
import { GameId, gameIdSchema, insertGameParams, NewGameParams, UpdateGameParams, updateGameParams } from "../db/schema/games";
import { createGame, deleteGame, updateGame } from "../api/games/mutations";

const revalidateGames = () => revalidatePath("/games");
const revalidateGame = (id: GameId) => revalidatePath(`/games/${id}`);

const handleErrors = (e: unknown) => {
    const errMsg = "Error, please try again.";
    if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
    if (e && typeof e === "object" && "error" in e) {
        const errAsStr = e.error as string;
        return errAsStr.length > 0 ? errAsStr : errMsg;
    }
    return errMsg;
};

export const createGameAction = async (input: NewGameParams) => {
    try {
        const payload = insertGameParams.parse(input);
        await createGame(payload);
        revalidateGames();
        return { success: true };
    } catch (e) {
        return handleErrors(e);
    }
};

export const updateGameAction = async (input: UpdateGameParams) => {
    try {
        const payload = updateGameParams.parse(input);
        await updateGame(payload.id, payload);
    } catch (e) {
        return handleErrors(e);
    }
}

export const deleteGameAction = async (input: GameId) => {
    try {
        const payload = gameIdSchema.parse({ id: input });
        await deleteGame(payload.id);
        revalidateGames();
    } catch (e) {
        return handleErrors(e);
    }
}