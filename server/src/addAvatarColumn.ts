import { pool } from './db';

async function addAvatarColumn() {
  const client = await pool.connect();
  try {
    console.log('🔄 Adding avatar column to drivers table...');

    // Check if column exists
    const checkColumn = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'drivers' AND column_name = 'avatar'
    `);

    if (checkColumn.rows.length === 0) {
      // Column doesn't exist, add it
      await client.query(`
        ALTER TABLE drivers ADD COLUMN avatar TEXT
      `);
      console.log('✅ Avatar column added successfully');
    } else {
      console.log('ℹ️  Avatar column already exists');
    }
  } catch (error) {
    console.error('❌ Failed to add avatar column:', error);
    throw error;
  } finally {
    await client.release();
    await pool.end();
  }
}

addAvatarColumn();
