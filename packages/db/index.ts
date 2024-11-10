import { logger } from '@connecto/logger'
import {
  CamelCasePlugin,
  DeduplicateJoinsPlugin,
  Kysely,
  KyselyConfig,
  PostgresDialect,
  RawBuilder,
  sql,
} from 'kysely'
import { Pool } from 'pg'
import { format } from 'sql-formatter'

import { DB } from './types/db'

/**
 * Shared configuration for the Kysely database instance.
 * Includes plugins for camel case conversion and deduplication of joins.
 */
export const sharedConfig: Partial<KyselyConfig> = {
  plugins: [new CamelCasePlugin(), new DeduplicateJoinsPlugin()],
  log(event) {
    if (event.level === 'error') {
      logger.error('❌ Query failed: ')
      logger.error({
        durationMs: event.queryDurationMillis,
        error: event.error,
      })
      logger.error(formatSQL(event.query.sql))
    } else {
      logger.info('✅ Query executed: ')
      logger.info({
        durationMs: event.queryDurationMillis,
      })
      logger.info(formatSQL(event.query.sql))
      logger.info(event.query.parameters)
    }
  },
}

/**
 * Kysely database instance configured for PostgreSQL.
 * Utilizes a connection pool and shared configuration.
 */
export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL!,
      max: 50,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    }),
  }),
  ...sharedConfig,
})

/**
 * Helper function to convert a value to JSONB format for PostgreSQL.
 * @param value - The value to be converted.
 * @returns A RawBuilder containing the JSONB representation.
 */
export function jsonb<T>(value: T): RawBuilder<T> {
  return sql`CAST(${JSON.stringify(value)} AS JSONB)`
}

/**
 * Formats a SQL query string for better readability.
 * @param query - The SQL query string.
 * @returns A formatted SQL query string.
 */
export function formatSQL(query: string): string {
  return format(query, {
    language: 'postgresql',
    indentStyle: 'standard',
    linesBetweenQueries: 2,
  })
}

// Export Kysely and PostgreSQL modules
export * from 'kysely'
export * as pg from 'pg'
