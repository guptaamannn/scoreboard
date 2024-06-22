import { db } from "@/lib/db";
import { insertRoundParams, NewRoundParams } from "@/lib/db/schema/rounds";

export const createRound = async (round: NewRoundParams) => {
    const newRound = insertRoundParams.parse(round);
    try {
        const r = await db.round.create({
            data: {
                creatorId: newRound.creatorId,
                gameId: newRound.gameId,
                scores: {
                    create: newRound.scores
                }
            },
            include: {
                scores: true
            }
        }
        );
        return { round: r };
    } catch (err) {
        const message = (err as Error).message ?? "Error, please try again";
        console.error(message);
        throw { error: message };
    }
}