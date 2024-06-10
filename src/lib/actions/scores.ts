"use server";

import { revalidatePath } from "next/cache";

const revalidateScores = () => revalidatePath("/games");

const handleErrors = (e: unknown) => {
    const errMsg = "Error, please try again.";
    if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
    if (e && typeof e === "object" && "error" in e) {
        const errAsStr = e.error as string;
        return errAsStr.length > 0 ? errAsStr : errMsg;
    }
    return errMsg;
};


