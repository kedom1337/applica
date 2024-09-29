import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Database connection solely for running migrations
const migrationClient = postgres(process.env['DATABASE_URL'] as string, {
  max: 1,
})
export const migrateDb = drizzle(migrationClient)

// Database connection for client use
const queryClient = postgres(process.env['DATABASE_URL'] as string)
export const db = drizzle(queryClient, { schema })
