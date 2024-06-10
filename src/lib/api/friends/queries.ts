"use server";

import { db } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";

export const getFriends = async () => {
    const { session } = await getUserAuth();
    const f = await db.friend.findMany({
        where: {
            OR: [
                {
                    user1: session?.user.id!
                },
                {
                    user2: session?.user.id!
                }
            ]
        },
        orderBy: { 'updatedAt': 'desc' },
        select: {
            id: true,
            status: true,
            user1: true,
            user2: true,
            user1User: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true,
                }
            },
            user2User: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true,
                }
            }
        }
    });
    return { friends: f };
}

export const getAcceptedFriends = async () => {
    const { session } = await getUserAuth();
    const f = await db.friend.findMany({
        where: {
            status: "ACCEPTED",
            OR: [
                {
                    user1: session?.user.id!
                },
                {
                    user2: session?.user.id!
                }
            ]
        },
        orderBy: { 'updatedAt': 'desc' },
        select: {
            id: true,
            status: true,
            user1: true,
            user2: true,
            user1User: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true,
                }
            },
            user2User: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true,
                }
            }
        }
    });
    const friends = f.map((f) => {
        if (f.user1 === session?.user.id) {
            return f.user2User
        } else {
            return f.user1User
        }
    })
    return { friends };
}