import * as path from 'node:path'
import { promises as fs } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { Pool } from 'pg'
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from 'kysely'
import { DB } from 'kysely-codegen'
import { Command } from 'commander'

import { sharedConfig } from '../index'

// Utility to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Function to create a migrator
async function createMigrator() {
  const db = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 1,
      }),
    }),
    ...sharedConfig,
  })

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, '../migrations'),
    }),
  })

  return { db, migrator }
}

async function migrateToLatest() {
  const { db, migrator } = await createMigrator()
  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`Migration "${it.migrationName}" was executed successfully.`)
    } else if (it.status === 'Error') {
      console.error(`Failed to execute migration "${it.migrationName}".`)
    }
  })

  if (error) {
    console.error('Failed to migrate to latest')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

async function migrateUp() {
  const { db, migrator } = await createMigrator()
  const { error, results } = await migrator.migrateUp()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`Migration "${it.migrationName}" was executed successfully.`)
    } else if (it.status === 'Error') {
      console.error(`Failed to execute migration "${it.migrationName}".`)
    }
  })

  if (error) {
    console.error('Failed to migrate up')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

async function migrateDown() {
  const { db, migrator } = await createMigrator()
  const { error, results } = await migrator.migrateDown()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`Migration "${it.migrationName}" was executed successfully.`)
    } else if (it.status === 'Error') {
      console.error(`Failed to execute migration "${it.migrationName}".`)
    }
  })

  if (error) {
    console.error('Failed to migrate down')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

async function migrateTo(targetMigrationName: string) {
  const { db, migrator } = await createMigrator()
  const { error, results } = await migrator.migrateTo(targetMigrationName)

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`Migration "${it.migrationName}" was executed successfully.`)
    } else if (it.status === 'Error') {
      console.error(`Failed to execute migration "${it.migrationName}".`)
    }
  })

  if (error) {
    console.error(`Failed to migrate to ${targetMigrationName}`)
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

const program = new Command()

program
  .command('up')
  .description('Migrate one step up')
  .action(async () => {
    await migrateUp()
  })

program
  .command('down')
  .description('Migrate one step down')
  .action(async () => {
    await migrateDown()
  })

program
  .command('latest')
  .description('Migrate to the latest version')
  .action(async () => {
    await migrateToLatest()
  })

program
  .command('to <migration>')
  .description('Migrate to a specific migration')
  .action(async (migration) => {
    await migrateTo(migration)
  })

program.parse(process.argv)
