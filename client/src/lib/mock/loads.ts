import type { Load } from '@/types/load';

export const mockLoads: Load[] = [
  {
    id: 'l1',
    ref: 'DL-10021',
    status: 'DISPATCHED',
    driverId: 'd2',
    pickup: 'Dallas, TX',
    dropoff: 'Atlanta, GA',
    pickupDate: '2026-01-24',
    rate: 1800,
    brokerName: 'Echo Logistics',
    shipperName: 'ACME Foods',
    notes: 'Call receiver 1 hour prior.'
  },
  {
    id: 'l2',
    ref: 'DL-10022',
    status: 'DELIVERED',
    driverId: 'd1',
    pickup: 'Houston, TX',
    dropoff: 'Phoenix, AZ',
    pickupDate: '2026-01-18',
    rate: 2400,
    brokerName: 'C.H. Robinson',
    shipperName: 'Global Paper Co'
  },
  {
    id: 'l3',
    ref: 'DL-10023',
    status: 'BOOKED',
    driverId: 'd1',
    pickup: 'San Antonio, TX',
    dropoff: 'Denver, CO',
    pickupDate: '2026-01-28',
    rate: 2100,
    brokerName: 'TQL',
    shipperName: 'Blue Steel',
    notes: 'Requires POD upload after delivery.'
  }
];
