import { pool } from '../db';
import { User, UserInput, AuthResponse } from '../models/User';
import { generateObjectId } from '../utils/objectId';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../env';
import { DatabaseError, NotFoundError } from '../utils/errors';

export async function signup(input: UserInput): Promise<AuthResponse> {
  try {
    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [input.email]
    );
    if (existingUser.rows.length > 0) {
      throw new Error('User with this email already exists');
    }

    const id = generateObjectId();
    const createdAt = new Date().toISOString();

    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const query = `
      INSERT INTO users (id, first_name, last_name, email, phone_number, password, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, first_name, last_name, email, phone_number
    `;

    const result = await pool.query(query, [
      id,
      input.firstName,
      input.lastName,
      input.email,
      input.phoneNumber,
      hashedPassword,
      createdAt
    ]);

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret || 'your-secret-key',
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phoneNumber: user.phone_number
      }
    };
  } catch (err: any) {
    throw new Error(err.message || 'Failed to sign up');
  }
}

export async function signin(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const result = await pool.query(
      'SELECT id, first_name, last_name, email, phone_number, password FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      throw new Error('Invalid email or password');
    }

    const user = result.rows[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret || 'your-secret-key',
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phoneNumber: user.phone_number
      }
    };
  } catch (err: any) {
    throw new Error(err.message || 'Failed to sign in');
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const result = await pool.query(
      'SELECT id, first_name, last_name, email, phone_number, created_at FROM users WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) return null;

    const user = result.rows[0];
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phoneNumber: user.phone_number,
      password: '',
      createdAt: user.created_at
    };
  } catch (err) {
    throw new DatabaseError('Failed to fetch user');
  }
}

export async function getCurrentUser(
  token: string | undefined
): Promise<User | null> {
  try {
    if (!token) return null;

    // Extract token from "Bearer <token>" format
    const bearerToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    // Verify and decode token
    const decoded: any = jwt.verify(
      bearerToken,
      config.jwtSecret || 'your-secret-key'
    );

    return await getUserById(decoded.userId);
  } catch (err) {
    return null;
  }
}
