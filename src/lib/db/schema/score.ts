import { getScores } from "@/lib/api/scores/queries";
import { ScoreSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";



const baseSchema = ScoreSchema.omit({ createdAt: true });

export const insertScoreSchema = baseSchema.extend({}).omit({ id: true, roundId: true });
export const insertScoreParams = baseSchema.extend({}).omit({ id: true, roundId: true });

export const updateScoreSchema = baseSchema;
export const updateScoreParams = updateScoreSchema.extend({}).omit({});

export const scoreIdSchema = baseSchema.pick({ id: true });

export type Score = z.infer<typeof ScoreSchema>;

export type NewScore = z.infer<typeof insertScoreSchema>;
export type NewScoreParams = z.infer<typeof insertScoreParams>;


export type UpdateScoreParams = z.infer<typeof updateScoreParams>;
export type ScoreId = z.infer<typeof scoreIdSchema>["id"]

export type CompleteScore = Awaited<ReturnType<typeof getScores>>["scores"][number];