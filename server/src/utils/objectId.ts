import crypto from 'crypto';

export function generateObjectId(): string {
  return crypto.randomBytes(12).toString('hex');
}

export function isValidObjectId(id: string): boolean {
  return /^[a-f0-9]{24}$/.test(id);
}
