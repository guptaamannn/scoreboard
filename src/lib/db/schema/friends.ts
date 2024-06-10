import { getFriends } from "@/lib/api/friends/queries";
import { timestamps } from "@/lib/utils";
import { FriendSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";

const baseSchema = FriendSchema.omit(timestamps);

export const insertFriendSchema = baseSchema.omit({ id: true });
export const insertFriendParams = baseSchema.extend({}).omit({
    id: true,
    user1: true,
    status: true,
});

export const updateFriendSchema = baseSchema;
export const updateFriendParams = updateFriendSchema.extend({}).omit({});

export type NewFriendParams = z.infer<typeof insertFriendParams>;
export type UpdateFriendParams = z.infer<typeof updateFriendParams>;

export type CompleteFriend = Awaited<ReturnType<typeof getFriends>>["friends"][number]