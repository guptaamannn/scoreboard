"use server";

import { getUserAuth } from '@/lib/auth/utils';
import { db } from '@/lib/db';
import { insertFriendSchema, NewFriendParams, UpdateFriendParams, updateFriendSchema } from '@/lib/db/schema/friends';

export const createFriend = async (friend: NewFriendParams) => {
    const { session } = await getUserAuth();
    const newFriend = insertFriendSchema.parse({ user1: session?.user.id!, user2: friend.user2, status: "PENDING" });
    try {
        const f = await db.friend.create({ data: newFriend });
        return { friend: f };
    } catch (error) {
        const message = (error as Error).message ?? 'Error, please try again';
        console.error(message);
        throw { error: message };
    }

}

export const updateFriend = async (id: string, friend: UpdateFriendParams) => {
    const newFriend = updateFriendSchema.parse({ ...friend });
    try {
        const f = await db.friend.update({ where: { id }, data: newFriend });
        return { friend: f };
    } catch (error) {
        const message = (error as Error).message ?? 'Error, please try again';
        console.error(message);
        throw { error: message };
    }
}

export const deleteFriend = async (id: string) => {
    try {
        const f = await db.friend.delete({ where: { id } });
        return { friend: f };
    } catch (error) {
        const message = (error as Error).message ?? 'Error, please try again';
        console.error(message);
        throw { error: message };
    }
}