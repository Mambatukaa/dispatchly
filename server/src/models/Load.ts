export type LoadStatus =
  | 'NEW'
  | 'BOOKED'
  | 'DISPATCHED'
  | 'PICKED_UP'
  | 'DELIVERED'
  | 'INVOICED'
  | 'PAID'
  | 'CANCELED';

export type Load = {
  id: string;
  ref: string;
  status: LoadStatus;
  driverId?: string;
  brokerId?: string;
  pickup: string;
  dropoff: string;
  pickupDate: string;
  dropoffDate?: string;
  rate?: number;
  notes?: string;
};

export type LoadInput = {
  driverId: string;
  brokerId: string;
  pickup: string;
  dropoff: string;
  ref?: string;
  pickupDate?: string;
  dropoffDate?: string;
  rate?: number;
  notes?: string;
  status?: LoadStatus;
};
