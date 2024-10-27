import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { migrateDb } from '../db'

async function runMigrations(): Promise<void> {
  try {
    console.log('running database migrations...')
    await migrate(migrateDb, {
      migrationsFolder: 'src/db/migrations',
    })
    console.log('database migrations completed successfully')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  process.exit()
}

runMigrations()
