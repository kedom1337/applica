import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { getEnv } from '../common/util'

// Database connection solely for running migrations
const migrationClient = postgres(getEnv('DATABASE_URL'), {
  max: 1,
})
export const migrateDb = drizzle(migrationClient)

// Database connection for client use
const queryClient = postgres(getEnv('DATABASE_URL'))
export const db = drizzle(queryClient, { schema })
