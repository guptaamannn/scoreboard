import { z } from 'zod';

export const FriendScalarFieldEnumSchema = z.enum(['id','user1','user2','status','createdAt','updatedAt']);

export default FriendScalarFieldEnumSchema;
