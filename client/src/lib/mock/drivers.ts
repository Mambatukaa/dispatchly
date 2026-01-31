import type { Driver } from '@/types/driver';

export const mockDrivers: Driver[] = [
  {
    id: 'd1',
    name: 'James Carter',
    phone: '(555) 123-4567',
    note: 'Prefers morning pickups.',
    createdAt: '2026-01-10'
  },
  {
    id: 'd2',
    name: 'Maria Lopez',
    phone: '(555) 987-1111',
    createdAt: '2026-01-12'
  },
  {
    id: 'd3',
    name: 'Andre Miller',
    phone: '(555) 222-9080',
    createdAt: '2026-01-15'
  }
];
