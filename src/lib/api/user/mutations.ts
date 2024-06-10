"use server";

import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { updateUserParams, type UpdateUserParams } from "@/lib/db/schema/users";

export const updateUser = async (user: UpdateUserParams) => {
    const { session } = await getUserAuth();
    if (session?.user.id !== user.id) {
        throw { error: "Unauthorized" };
    }
    const newUser = updateUserParams.parse(user);
    try {
        const u = await db.user.update({
            where: {
                id: newUser.id
            },
            data: {
                name: newUser.name,
                username: newUser.username
            }
        });
        return { user: u };
    } catch (err) {
        const message = (err as Error).message ?? "Error, please try again";
        console.error(message);
        throw { error: message };
    }
}