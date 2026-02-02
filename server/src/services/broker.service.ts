import { pool } from '../db';
import { Broker, BrokerInput } from '../models/Broker';
import { generateObjectId } from '../utils/objectId';
import { DatabaseError, NotFoundError } from '../utils/errors';

export async function getBrokers(): Promise<Broker[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM brokers ORDER BY created_at DESC'
    );
    return result.rows.map(rowToBroker);
  } catch (err) {
    throw new DatabaseError('Failed to fetch brokers');
  }
}

export async function getBrokerById(id: string): Promise<Broker | null> {
  try {
    const result = await pool.query('SELECT * FROM brokers WHERE id = $1', [
      id
    ]);
    if (result.rows.length === 0) return null;
    return rowToBroker(result.rows[0]);
  } catch (err) {
    throw new DatabaseError('Failed to fetch broker');
  }
}

export async function createBroker(input: BrokerInput): Promise<Broker> {
  try {
    const id = generateObjectId();
    const createdAt = new Date().toISOString();

    const query = `
      INSERT INTO brokers (id, logistic_name, mc, broker_name, phone_number, created_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const result = await pool.query(query, [
      id,
      input.logisticName,
      input.mc,
      input.brokerName,
      input.phoneNumber,
      createdAt
    ]);

    return rowToBroker(result.rows[0]);
  } catch (err) {
    console.error('Error creating broker:', err);
    throw new DatabaseError(
      `Failed to create broker: ${err instanceof Error ? err.message : 'Unknown error'}`
    );
  }
}

export async function updateBroker(
  id: string,
  input: BrokerInput
): Promise<Broker> {
  try {
    const broker = await getBrokerById(id);
    if (!broker) {
      throw new NotFoundError('Broker not found');
    }

    // Map of input field names to database column names
    const fieldMap: Record<keyof BrokerInput, string> = {
      logisticName: 'logistic_name',
      mc: 'mc',
      brokerName: 'broker_name',
      phoneNumber: 'phone_number'
    };

    // Filter out undefined values and map to database columns
    const updates = Object.entries(input)
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => ({
        column: fieldMap[key as keyof BrokerInput],
        value
      }));

    if (updates.length === 0) return broker;

    // Build SET clause with proper parameter placeholders
    const setClause = updates
      .map((_, i) => `${updates[i].column} = $${i + 1}`)
      .join(', ');

    const values = [...updates.map(u => u.value), id];
    const query = `UPDATE brokers SET ${setClause} WHERE id = $${updates.length + 1} RETURNING *`;

    const result = await pool.query(query, values);
    return rowToBroker(result.rows[0]);
  } catch (err) {
    if (err instanceof NotFoundError) throw err;
    throw new DatabaseError('Failed to update broker');
  }
}

export async function deleteBroker(id: string): Promise<boolean> {
  try {
    await pool.query('DELETE FROM brokers WHERE id = $1', [id]);
    return true;
  } catch (err) {
    throw new DatabaseError('Failed to delete broker');
  }
}

function rowToBroker(row: any): Broker {
  return {
    id: row.id,
    logisticName: row.logistic_name,
    mc: row.mc,
    brokerName: row.broker_name,
    phoneNumber: row.phone_number,
    createdAt: row.created_at
  };
}
