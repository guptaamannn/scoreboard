import { getUser } from "@/lib/api/user/queries";
import { UserSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";

const baseSchema = UserSchema;

export const insertUserSchema = baseSchema.omit({ id: true });
export const insertUserParams = baseSchema.extend({}).omit({ id: true });

export const updateUserSchema = baseSchema.extend({
    name: z.string().min(3, "Name must be at least 3 characters").max(31, "Name cannot be more than 31 characters"),
    username: z.string().min(4, "Username must be at least 4 characters").max(15, "Username cannot be more than 15 characters"),
}).omit({
    hashedPassword: true,
});

export const updateUserParams = updateUserSchema;

export const playerSchema = baseSchema.omit({
    hashedPassword: true,
    email: true,
})


export type UpdateUserParams = z.infer<typeof updateUserParams>;

export type Player = z.infer<typeof playerSchema>;

export type CompleteUser = Awaited<ReturnType<typeof getUser>>["user"]
