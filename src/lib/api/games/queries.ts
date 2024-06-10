"use server";

import { db } from '@/lib/db/index'
import { getUserAuth } from '@/lib/auth/utils'
import { GameId, gameIdSchema } from '@/lib/db/schema/games';

export const getGames = async ({ take, skip }: { take?: number, skip?: number }) => {
    const { session } = await getUserAuth();
    const g = await db.game.findMany({
        where: {
            OR: [
                {
                    creatorId: session?.user.id
                },
                {
                    players: {
                        some: {
                            id: session?.user.id
                        }
                    }
                }
            ]
        },
        orderBy: { createdAt: 'desc' },
        include: {
            players: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true
                }
            },
            _count: true,
        },
        take,
        skip,


    });
    return { games: g };
};

export const getGameById = async (id: GameId) => {
    const { session } = await getUserAuth();
    const { id: gameId } = gameIdSchema.parse({ id });
    const g = await db.game.findFirst({
        where: {
            id: gameId,
            OR: [
                {
                    creatorId: session?.user.id
                },
                {
                    players: {
                        some: {
                            id: session?.user.id
                        }
                    }
                }
            ]

        },
        include: {
            creator: {
                select: {
                    name: true,
                    username: true,
                    image: true,
                    id: true
                }
            },
            players: {

                select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true,
                    score: {
                        select: {
                            id: true,
                            points: true,
                            playerId: true,
                        },
                        where: {
                            gameId
                        }
                    }
                }
            },
            rounds: {
                select: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    scores: {
                        select: {
                            id: true,
                            playerId: true,
                            points: true
                        }
                    }

                }
            }
        }
    });
    return { game: g };
}