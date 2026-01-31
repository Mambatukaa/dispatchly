import { pool } from '../db';
import { Load, CreateLoadInput, UpdateLoadInput } from '../models/Load';
import { generateObjectId } from '../utils/objectId';
import { DatabaseError, NotFoundError } from '../utils/errors';

export async function getLoads(): Promise<Load[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM loads ORDER BY created_at DESC'
    );
    return result.rows.map(rowToLoad);
  } catch (err) {
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

export async function createLoad(input: CreateLoadInput): Promise<Load> {
  try {
    const id = generateObjectId();

    const query = `
      INSERT INTO loads (id, ref, status, driver_id, pickup, dropoff, pickup_date, rate, broker_name, shipper_name, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;

    const result = await pool.query(query, [
      id,
      input.ref,
      input.status || 'NEW',
      input.driverId || null,
      input.pickup,
      input.dropoff,
      input.pickupDate,
      input.rate || null,
      input.brokerName || null,
      input.shipperName || null,
      input.notes || null
    ]);

    return rowToLoad(result.rows[0]);
  } catch (err) {
    throw new DatabaseError('Failed to create load');
  }
}

export async function updateLoad(
  id: string,
  input: UpdateLoadInput
): Promise<Load> {
  try {
    const load = await getLoadById(id);
    if (!load) {
      throw new NotFoundError('Load not found');
    }

    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (input.ref !== undefined) {
      updates.push(`ref = $${paramCount}`);
      values.push(input.ref);
      paramCount++;
    }
    if (input.status !== undefined) {
      updates.push(`status = $${paramCount}`);
      values.push(input.status);
      paramCount++;
    }
    if (input.driverId !== undefined) {
      updates.push(`driver_id = $${paramCount}`);
      values.push(input.driverId);
      paramCount++;
    }
    if (input.pickup !== undefined) {
      updates.push(`pickup = $${paramCount}`);
      values.push(input.pickup);
      paramCount++;
    }
    if (input.dropoff !== undefined) {
      updates.push(`dropoff = $${paramCount}`);
      values.push(input.dropoff);
      paramCount++;
    }
    if (input.pickupDate !== undefined) {
      updates.push(`pickup_date = $${paramCount}`);
      values.push(input.pickupDate);
      paramCount++;
    }
    if (input.rate !== undefined) {
      updates.push(`rate = $${paramCount}`);
      values.push(input.rate);
      paramCount++;
    }
    if (input.brokerName !== undefined) {
      updates.push(`broker_name = $${paramCount}`);
      values.push(input.brokerName);
      paramCount++;
    }
    if (input.shipperName !== undefined) {
      updates.push(`shipper_name = $${paramCount}`);
      values.push(input.shipperName);
      paramCount++;
    }
    if (input.notes !== undefined) {
      updates.push(`notes = $${paramCount}`);
      values.push(input.notes);
      paramCount++;
    }

    if (updates.length === 0) return load;

    values.push(id);

    const query = `UPDATE loads SET ${updates.join(', ')} WHERE id = $${paramCount + 1} RETURNING *`;
    const result = await pool.query(query, values);

    return rowToLoad(result.rows[0]);
  } catch (err) {
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
    pickup: row.pickup,
    dropoff: row.dropoff,
    pickupDate: row.pickup_date,
    rate: row.rate,
    brokerName: row.broker_name,
    shipperName: row.shipper_name,
    notes: row.notes
  };
}
