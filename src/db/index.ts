import { neon } from '@netlify/neon';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from '../../db/schema';

export const db = drizzle({
    schema,
    client: neon()
});