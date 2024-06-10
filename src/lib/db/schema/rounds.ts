import { getRounds } from "@/lib/api/rounds/queries";
import { timestamps } from "@/lib/utils";
import { RoundSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { insertScoreParams, insertScoreSchema } from "./score";

const baseSchema = RoundSchema.omit(timestamps);

export const insertRoundSchema = baseSchema.extend({
    scores: z.array(insertScoreSchema),
}).omit({
    id: true
});
export const insertRoundParams = baseSchema.extend({
    scores: z.array(insertScoreParams),
}).omit({
    id: true
})

export const roundIdSchema = baseSchema.pick({ id: true });

export type Round = z.infer<typeof RoundSchema>;
export type NewRound = z.infer<typeof insertRoundSchema>;
export type NewRoundParams = z.infer<typeof insertRoundParams>;

export type RoundId = z.infer<typeof roundIdSchema>["id"]

export type CompleteRound = Awaited<ReturnType<typeof getRounds>>["rounds"][number];