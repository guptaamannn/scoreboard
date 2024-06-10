"use server";

import { revalidatePath } from "next/cache";
import { createRound } from "../api/rounds/mutations";
import { insertRoundParams, NewRoundParams } from "../db/schema/rounds";

const handleErrors = (e: unknown) => {
    const errMsg = "Error, please try again.";
    if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
    if (e && typeof e === "object" && "error" in e) {
        const errAsStr = e.error as string;
        return errAsStr.length > 0 ? errAsStr : errMsg;
    }
    return errMsg;
};

const revalidateScoreboard = (gameId: string) => revalidatePath(`/games/${gameId}`)

export const createRoundAction = async (input: NewRoundParams) => {
    try {
        const payload = insertRoundParams.parse(input);
        await createRound(payload);
        revalidateScoreboard(payload.gameId.toString());
    } catch (e) {
        return handleErrors(e);
    }
}