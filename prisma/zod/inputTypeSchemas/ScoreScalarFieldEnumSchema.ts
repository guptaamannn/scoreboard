import { z } from 'zod';

export const ScoreScalarFieldEnumSchema = z.enum(['id','playerId','gameId','points','createdAt','roundId']);

export default ScoreScalarFieldEnumSchema;
