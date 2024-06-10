import { z } from 'zod';

export const GameScalarFieldEnumSchema = z.enum(['id','creatorId','description','ended','showTotal','highestWins','hideOpponents','createdAt','updatedAt']);

export default GameScalarFieldEnumSchema;
