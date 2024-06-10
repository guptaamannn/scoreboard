import { z } from 'zod';

/////////////////////////////////////////
// ROUND SCHEMA
/////////////////////////////////////////

export const RoundSchema = z.object({
  id: z.number(),
  creatorId: z.string(),
  gameId: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Round = z.infer<typeof RoundSchema>

export default RoundSchema;
