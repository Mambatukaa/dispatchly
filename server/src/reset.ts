import { Pool } from 'pg';
import { config } from './env';

const pool = new Pool({
  user: config.database.user,
  password: config.database.password,
  host: config.database.host,
  port: config.database.port,
  database: config.database.database
});

async function resetDatabase() {
  const client = await pool.connect();
  try {
    console.log('🔄 Resetting database...');

    // Drop tables
    await client.query('DROP TABLE IF EXISTS loads');
    console.log('✓ Dropped loads table');

    await client.query('DROP TABLE IF EXISTS drivers');
    console.log('✓ Dropped drivers table');

    // Recreate tables with proper foreign key constraint
    await client.query(`
      CREATE TABLE drivers (
        id VARCHAR(24) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255),
        status VARCHAR(50) DEFAULT 'AVAILABLE',
        avatar TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✓ Created drivers table');

    await client.query(`
      CREATE TABLE loads (
        id VARCHAR(24) PRIMARY KEY,
        ref VARCHAR(255) UNIQUE NOT NULL,
        status VARCHAR(50) DEFAULT 'NEW',
        driver_id VARCHAR(24),
        pickup VARCHAR(255) NOT NULL,
        dropoff VARCHAR(255) NOT NULL,
        pickup_date TIMESTAMP NOT NULL,
        rate DECIMAL(10, 2),
        shipper_name VARCHAR(255),
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY(driver_id) REFERENCES drivers(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Created loads table with CASCADE constraint');

    console.log('✅ Database reset completed successfully');
  } catch (error) {
    console.error('❌ Reset failed:', error);
    throw error;
  } finally {
    await client.release();
    await pool.end();
  }
}

resetDatabase();
