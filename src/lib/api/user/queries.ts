"use server";

import { db } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils"

export const getUser = async () => {
    const { session } = await getUserAuth();
    const u = await db.user.findFirst({
        where: { id: session?.user.id! },

    });
    return { user: u };
}

export const searchUser = async (username: string) => {
    const { session } = await getUserAuth();
    const u = await db.user.findMany({
        where: {
            username: {
                equals: username
            },
            id: {
                not: session?.user.id
            }
        }
    });
    return { users: u };
}

