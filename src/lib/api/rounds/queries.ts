"use server";
import { db } from '@/lib/db/index';
import { GameId } from '@/lib/db/schema/games';

export const getRounds = async (gameId: GameId) => {
    const rounds = await db.round.findMany({
        where: { gameId },
        orderBy: { createdAt: 'asc' },
        include: {
            scores: {
                include: {
                    player: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            image: true,
                        }
                    }
                }
            }
        }
    });


    return { rounds };
}