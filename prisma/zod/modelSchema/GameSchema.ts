import { z } from 'zod';

/////////////////////////////////////////
// GAME SCHEMA
/////////////////////////////////////////

export const GameSchema = z.object({
  id: z.number(),
  creatorId: z.string(),
  description: z.string().nullable(),
  ended: z.boolean(),
  showTotal: z.boolean(),
  highestWins: z.boolean(),
  hideOpponents: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Game = z.infer<typeof GameSchema>

export default GameSchema;
