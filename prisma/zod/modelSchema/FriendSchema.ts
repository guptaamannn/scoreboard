import { z } from 'zod';
import { FriendStatusSchema } from '../inputTypeSchemas/FriendStatusSchema'

/////////////////////////////////////////
// FRIEND SCHEMA
/////////////////////////////////////////

export const FriendSchema = z.object({
  status: FriendStatusSchema,
  id: z.string(),
  user1: z.string(),
  user2: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Friend = z.infer<typeof FriendSchema>

export default FriendSchema;
