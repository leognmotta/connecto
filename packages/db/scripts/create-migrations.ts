import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

import { Command } from 'commander'

// Function to generate a random name
function generateRandomName(length: number = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// The migration template
const migrationTemplate = `import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
}

`

// Setting up the command line options with commander
const program = new Command()
program.option('--name <name>', 'Name of the migration')

program.parse(process.argv)

const options = program.opts()
const migrationName = options.name || generateRandomName()

// Generate the filename with the ISO 8601 date
const datePrefix = Date.now()
const fileName = `${datePrefix}-${migrationName}.ts`

// Handle ES Module __dirname workaround
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Determine the directory path
const migrationsDir = path.resolve(__dirname, '../migrations')

// Ensure the directory exists
fs.mkdirSync(migrationsDir, { recursive: true })

// Determine the file path
const filePath = path.join(migrationsDir, fileName)

// Write the migration template to the file
fs.writeFileSync(filePath, migrationTemplate)

console.log(`Migration file created at ${filePath}`)
