import { Pool } from 'pg';
import { config } from './env';

export const pool = new Pool({
  user: config.database.user,
  password: config.database.password,
  host: config.database.host,
  port: config.database.port,
  database: config.database.database
});

pool.on('error', err => {
  console.error('Unexpected error on idle client', err);
});

export async function initializeDatabase() {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully');
    client.release();
  } catch (err) {
    console.error('Database connection failed', err);
    process.exit(1);
  }
}
