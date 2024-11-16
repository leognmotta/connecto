import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`
    -- Create Extensions
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    SET pg_trgm.similarity_threshold = 0.1;

    -- Create Enums
    CREATE TYPE step_status AS ENUM ('Success', 'Failure', 'Pending');
    CREATE TYPE app_type AS ENUM ('App', 'Utility');

    -- Create Tables
    CREATE TABLE app (
        id VARCHAR PRIMARY KEY,
        type app_type DEFAULT 'App',
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        website VARCHAR(255),
        documentation_url VARCHAR(255),
        open_api_specification_url VARCHAR(255),
        logo_url VARCHAR(255),
        managed_by VARCHAR,
        is_global BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE INDEX idx_app_slug ON app (slug);
    CREATE INDEX idx_app_name_similarity ON "app" USING gist ("name" gist_trgm_ops);
    CREATE INDEX idx_app_managed_by ON "app" (managed_by);

    CREATE TABLE app_version (
        id VARCHAR PRIMARY KEY,
        app_id VARCHAR REFERENCES app(id) ON DELETE CASCADE,
        version VARCHAR(50) NOT NULL,
        definition JSONB,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        UNIQUE (app_id, version)
    );

    CREATE INDEX idx_app_version_app_id ON app_version (app_id);
    CREATE INDEX idx_app_version_version ON app_version (version);

    CREATE TABLE credential (
        id VARCHAR PRIMARY KEY,
        app_id VARCHAR REFERENCES app(id) ON DELETE CASCADE NOT NULL,
        workspace_id VARCHAR,
        meta JSONB,
        verified_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE INDEX idx_credential_app_id ON credential (app_id);
    CREATE INDEX idx_credential_workspace_id ON credential (workspace_id);

    CREATE TABLE workflow (
        id VARCHAR PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        workspace_id VARCHAR,
        definition JSONB,
        description TEXT,
        created_by VARCHAR,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP,
        UNIQUE (workspace_id, name)
    );

    CREATE INDEX idx_workflow_workspace_id ON workflow (workspace_id);
    CREATE INDEX idx_workflow_name ON workflow (name);
    CREATE INDEX idx_workflow_created_by ON workflow (created_by);

    CREATE TABLE audit_log (
        id VARCHAR PRIMARY KEY,
        workspace_id VARCHAR,
        action VARCHAR(255) NOT NULL,
        occurred_at TIMESTAMP NOT NULL,
        actor JSONB NOT NULL,
        targets JSONB,
        context JSONB
    );

    CREATE INDEX idx_audit_log_workspace_id ON audit_log (workspace_id);
  `.execute(db)
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await sql`
    -- Drop Tables with Dependencies First
    DROP TABLE IF EXISTS audit_log;
    DROP TABLE IF EXISTS workflow;
    DROP TABLE IF EXISTS credential;
    DROP TABLE IF EXISTS app_version;
    DROP TABLE IF EXISTS app;

    -- Drop Enums
    DROP TYPE IF EXISTS step_status;
    DROP TYPE IF EXISTS app_type;

    -- Drop Indexes
    DROP INDEX IF EXISTS idx_audit_log_workspace_id;
    DROP INDEX IF EXISTS idx_credential_workspace_id;
    DROP INDEX IF EXISTS idx_credential_app_id;
    DROP INDEX IF EXISTS idx_app_version_version;
    DROP INDEX IF EXISTS idx_app_version_app_id;
    DROP INDEX IF EXISTS idx_app_managed_by;
    DROP INDEX IF EXISTS idx_app_name_similarity;
    DROP INDEX IF EXISTS idx_app_slug;
    DROP INDEX IF EXISTS idx_workflow_workspace_id;
    DROP INDEX IF EXISTS idx_workflow_name;
    DROP INDEX IF EXISTS idx_workflow_created_by;

    -- Drop Extensions
    DROP EXTENSION IF EXISTS pg_trgm;
  `.execute(db)
}
