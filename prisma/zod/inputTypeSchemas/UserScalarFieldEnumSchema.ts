import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','email','hashedPassword','name','username','image']);

export default UserScalarFieldEnumSchema;
