"use server";

import { revalidatePath } from "next/cache";
import { updateUser } from "../api/user/mutations";
import { updateUserParams, UpdateUserParams } from "../db/schema/users";

const revalidateGames = () => revalidatePath("/games");

const handleErrors = (e: unknown) => {
    const errMsg = "Error, please try again.";
    if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
    if (e && typeof e === "object" && "error" in e) {
        const errAsStr = e.error as string;
        return errAsStr.length > 0 ? errAsStr : errMsg;
    }
    return errMsg;
};

export const updateUserAction = async (user: UpdateUserParams) => {
    try {
        const payload = updateUserParams.parse(user);
        const u = await updateUser(payload);
        revalidateGames();
        return { user: u };
    } catch (e) {
        return handleErrors(e);
    }
}