import { pool } from './db';

async function addEmailColumn() {
  const client = await pool.connect();
  try {
    console.log('🔄 Adding email column to drivers table...');

    // Check if column exists
    const checkColumn = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'drivers' AND column_name = 'email'
    `);

    if (checkColumn.rows.length === 0) {
      // Column doesn't exist, add it
      await client.query(`
        ALTER TABLE drivers ADD COLUMN email VARCHAR(255)
      `);
      console.log('✅ Email column added successfully');
    } else {
      console.log('ℹ️  Email column already exists');
    }
  } catch (error) {
    console.error('❌ Failed to add email column:', error);
    throw error;
  } finally {
    await client.release();
    await pool.end();
  }
}

addEmailColumn();
