"use server";

import { revalidatePath } from "next/cache";
import { updateUser } from "../api/user/mutations";
import { updateUserParams, UpdateUserParams } from "../db/schema/users";

const revalidateGames = () => revalidatePath("/games");

export const updateUserAction = async (user: UpdateUserParams) => {
    try {
        const payload = updateUserParams.parse(user);
        const u = await updateUser(payload);
        revalidateGames();
        return { user: u };
    } catch (e) {
        console.error(e);
    }
}