import { pool } from '../db';
import { Driver, DriverInput } from '../models/Driver';
import { generateObjectId } from '../utils/objectId';
import { DatabaseError, NotFoundError } from '../utils/errors';

export async function getDrivers(): Promise<Driver[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM drivers ORDER BY created_at DESC'
    );
    return result.rows.map(rowToDriver);
  } catch (err) {
    throw new DatabaseError('Failed to fetch drivers');
  }
}

export async function getDriverById(id: string): Promise<Driver | null> {
  try {
    const result = await pool.query('SELECT * FROM drivers WHERE id = $1', [
      id
    ]);
    if (result.rows.length === 0) return null;
    return rowToDriver(result.rows[0]);
  } catch (err) {
    throw new DatabaseError('Failed to fetch driver');
  }
}

export async function createDriver(input: DriverInput): Promise<Driver> {
  try {
    const id = generateObjectId();
    const createdAt = new Date().toISOString();
    const status = input.status || 'AVAILABLE';
    const avatar =
      input.avatar ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(input.name)}`;
    const email = input.email || null;

    const query = `
      INSERT INTO drivers (id, name, phone, email, status, avatar, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const result = await pool.query(query, [
      id,
      input.name,
      input.phone,
      email,
      status,
      avatar,
      createdAt
    ]);

    return rowToDriver(result.rows[0]);
  } catch (err) {
    console.error('Error creating driver:', err);
    throw new DatabaseError('Failed to create driver');
  }
}

export async function updateDriver(
  id: string,
  input: DriverInput
): Promise<Driver> {
  try {
    const driver = await getDriverById(id);
    if (!driver) {
      throw new NotFoundError('Driver not found');
    }

    // Map of input field names to database column names
    const fieldMap: Record<keyof DriverInput, string> = {
      name: 'name',
      phone: 'phone',
      email: 'email',
      status: 'status',
      avatar: 'avatar'
    };

    // Filter out undefined values and map to database columns
    const updates = Object.entries(input)
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => ({
        column: fieldMap[key as keyof DriverInput],
        value
      }));

    if (updates.length === 0) return driver;

    // Build SET clause with proper parameter placeholders
    const setClause = updates
      .map((_, i) => `${updates[i].column} = $${i + 1}`)
      .join(', ');

    const values = [...updates.map(u => u.value), id];
    const query = `UPDATE drivers SET ${setClause} WHERE id = $${updates.length + 1} RETURNING *`;

    const result = await pool.query(query, values);
    return rowToDriver(result.rows[0]);
  } catch (err) {
    if (err instanceof NotFoundError) throw err;
    throw new DatabaseError('Failed to update driver');
  }
}

export async function deleteDriver(id: string): Promise<boolean> {
  try {
    await pool.query('DELETE FROM drivers WHERE id = $1', [id]);
    return true;
  } catch (err) {
    throw new DatabaseError('Failed to delete driver');
  }
}

function rowToDriver(row: any): Driver {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    status: row.status,
    avatar: row.avatar,
    createdAt: row.created_at
  };
}
