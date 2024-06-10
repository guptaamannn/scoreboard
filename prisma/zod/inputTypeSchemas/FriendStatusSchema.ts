import { z } from 'zod';

export const FriendStatusSchema = z.enum(['PENDING','ACCEPTED']);

export type FriendStatusType = `${z.infer<typeof FriendStatusSchema>}`

export default FriendStatusSchema;
