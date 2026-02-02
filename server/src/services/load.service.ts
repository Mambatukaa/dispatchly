import { pool } from '../db';
import { Load, LoadInput } from '../models/Load';
import { generateObjectId } from '../utils/objectId';
import { DatabaseError, NotFoundError } from '../utils/errors';

export async function getLoads(): Promise<Load[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM loads ORDER BY created_at DESC'
    );
    return result.rows.map(rowToLoad);
  } catch (err) {
    console.log(err);
    throw new DatabaseError('Failed to fetch loads');
  }
}

export async function getLoadById(id: string): Promise<Load | null> {
  try {
    const result = await pool.query('SELECT * FROM loads WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return rowToLoad(result.rows[0]);
  } catch (err) {
    throw new DatabaseError('Failed to fetch load');
  }
}

export async function getLoadsByDriver(driverId: string): Promise<Load[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM loads WHERE driver_id = $1 ORDER BY created_at DESC',
      [driverId]
    );
    return result.rows.map(rowToLoad);
  } catch (err) {
    throw new DatabaseError('Failed to fetch driver loads');
  }
}

export async function createLoad(input: LoadInput): Promise<Load> {
  try {
    const id = generateObjectId();
    const ref = input.ref || `LOAD-${Date.now()}`;
    const pickupDate = input.pickupDate || new Date().toISOString();
    const dropoffDate = input.dropoffDate || null;

    const query = `
      INSERT INTO loads (id, ref, status, driver_id, broker_id, pickup, dropoff, pickup_date, dropoff_date, rate, notes, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, CURRENT_TIMESTAMP)
      RETURNING *
    `;

    const result = await pool.query(query, [
      id,
      ref,
      input.status || 'NEW',
      input.driverId,
      input.brokerId,
      input.pickup,
      input.dropoff,
      pickupDate,
      dropoffDate,
      input.rate || null,
      input.notes || null
    ]);

    return rowToLoad(result.rows[0]);
  } catch (err) {
    console.log('Error creating load:', err);
    throw new DatabaseError('Failed to create load');
  }
}

export async function updateLoad(id: string, input: LoadInput): Promise<Load> {
  try {
    const load = await getLoadById(id);
    if (!load) {
      throw new NotFoundError('Load not found');
    }

    // Map of input field names to database column names
    const fieldMap: Record<string, string> = {
      driverId: 'driver_id',
      brokerId: 'broker_id',
      pickup: 'pickup',
      dropoff: 'dropoff',
      ref: 'ref',
      pickupDate: 'pickup_date',
      dropoffDate: 'dropoff_date',
      rate: 'rate',
      notes: 'notes',
      status: 'status'
    };

    // Filter out undefined values and map to database columns
    const updates = Object.entries(input)
      .filter(
        ([key, value]) => value !== undefined && value !== '' && fieldMap[key]
      )
      .map(([key, value]) => ({
        column: fieldMap[key],
        value
      }));

    if (updates.length === 0) return load;

    // Build SET clause with proper parameter placeholders
    const setClause = updates
      .map((_, i) => `${updates[i].column} = $${i + 1}`)
      .join(', ');

    const values = [...updates.map(u => u.value), id];
    const query = `UPDATE loads SET ${setClause} WHERE id = $${updates.length + 1} RETURNING *`;

    const result = await pool.query(query, values);

    return rowToLoad(result.rows[0]);
  } catch (err) {
    console.error('Error updating load:', err);
    if (err instanceof NotFoundError) throw err;
    throw new DatabaseError('Failed to update load');
  }
}

export async function deleteLoad(id: string): Promise<boolean> {
  try {
    const load = await getLoadById(id);
    if (!load) {
      throw new NotFoundError('Load not found');
    }

    await pool.query('DELETE FROM loads WHERE id = $1', [id]);
    return true;
  } catch (err) {
    if (err instanceof NotFoundError) throw err;
    throw new DatabaseError('Failed to delete load');
  }
}

function rowToLoad(row: any): Load {
  return {
    id: row.id,
    ref: row.ref,
    status: row.status,
    driverId: row.driver_id,
    brokerId: row.broker_id,
    pickup: row.pickup,
    dropoff: row.dropoff,
    pickupDate: row.pickup_date,
    dropoffDate: row.dropoff_date,
    rate: row.rate,
    notes: row.notes
  };
}
