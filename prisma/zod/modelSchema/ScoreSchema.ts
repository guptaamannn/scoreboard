import { z } from 'zod';

/////////////////////////////////////////
// SCORE SCHEMA
/////////////////////////////////////////

export const ScoreSchema = z.object({
  id: z.number(),
  playerId: z.string(),
  gameId: z.number(),
  points: z.number(),
  createdAt: z.coerce.date(),
  roundId: z.number().nullable(),
})

export type Score = z.infer<typeof ScoreSchema>

export default ScoreSchema;
