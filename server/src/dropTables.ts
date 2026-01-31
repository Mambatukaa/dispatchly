import { Pool } from 'pg';
import { config } from './env';

const pool = new Pool({
  user: config.database.user,
  password: config.database.password,
  host: config.database.host,
  port: config.database.port,
  database: config.database.database
});

async function dropDatabase() {
  const client = await pool.connect();
  try {
    console.log('🔄 Dropping existing tables...');
    
    // Drop tables in correct order (loads first due to foreign key)
    await client.query('DROP TABLE IF EXISTS loads CASCADE');
    console.log('✅ Dropped loads table');
    
    await client.query('DROP TABLE IF EXISTS drivers CASCADE');
    console.log('✅ Dropped drivers table');
    
    console.log('✅ All tables dropped successfully');
  } catch (error) {
    console.error('❌ Failed to drop tables:', error);
    throw error;
  } finally {
    await client.release();
    await pool.end();
  }
}

dropDatabase();
