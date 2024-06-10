"use server";

import { revalidatePath } from "next/cache";
import { insertFriendParams, NewFriendParams, updateFriendParams, UpdateFriendParams } from "../db/schema/friends";
import { createFriend, deleteFriend, updateFriend } from "../api/friends/mutations";

const handleErrors = (e: unknown) => {
    const errMsg = "Error, please try again.";
    if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
    if (e && typeof e === "object" && "error" in e) {
        const errAsStr = e.error as string;
        return errAsStr.length > 0 ? errAsStr : errMsg;
    }
    return errMsg;
};

const revalidateFriends = () => revalidatePath("/friends");

export const createFriendAction = async (input: NewFriendParams) => {
    try {
        const payload = insertFriendParams.parse(input);
        await createFriend(payload);
        revalidateFriends();
    } catch (e) {
        return handleErrors(e);
    }
}

export const updateFriendAction = async (input: UpdateFriendParams) => {
    try {
        const payload = updateFriendParams.parse(input);
        await updateFriend(payload.id, payload);
        revalidateFriends();
    } catch (e) {
        return handleErrors(e);
    }
}

export const deleteFriendAction = async (id: string) => {
    try {
        await deleteFriend(id);
        revalidateFriends();
    } catch (e) {
        return handleErrors(e);
    }
}