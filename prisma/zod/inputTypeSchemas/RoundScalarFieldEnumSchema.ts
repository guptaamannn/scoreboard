import { z } from 'zod';

export const RoundScalarFieldEnumSchema = z.enum(['id','creatorId','gameId','createdAt','updatedAt']);

export default RoundScalarFieldEnumSchema;
