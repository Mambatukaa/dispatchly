import { Pool } from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';
import { config } from './env';

const pool = new Pool({
  user: config.database.user,
  password: config.database.password,
  host: config.database.host,
  port: config.database.port,
  database: config.database.database
});

async function runMigration() {
  const client = await pool.connect();
  try {
    console.log('🔄 Running database migration...');

    const sqlFile = join(__dirname, '..', 'init.sql');
    const sql = readFileSync(sqlFile, 'utf-8');

    // Split by semicolon and execute each statement
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      await client.query(statement);
    }

    console.log('✅ Migration completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await client.release();
    await pool.end();
  }
}

runMigration();
