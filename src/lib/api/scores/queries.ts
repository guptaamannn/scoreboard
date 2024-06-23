"use server";

import { GameId } from "@/lib/db/schema/games";
import { db } from "@/lib/db/index";

export const getScores = async (gameId: GameId) => {
    const r = await db.score.findMany({
        where: {
            gameId
        },
        include: {
            player: {
                select: {
                    id: true,
                    image: true,
                    username: true,
                    name: true,
                }
            },
        }
    })
    return { scores: r };
}

export const getTotal = async (gameId: GameId) => {
    const r = await db.score.groupBy({
        by: ['playerId'],
        _sum: {
            points: true
        },
        where: {
            gameId
        },
        orderBy: {
            _sum: {
                points: 'asc'
            }
        }
    })

    return { scores: r };
}