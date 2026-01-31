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
  pickup: string;
  dropoff: string;
  pickupDate: string;
  rate?: number;
  shipperName?: string;
  notes?: string;
};

export type LoadInput = {
  driverId: string;
  pickup: string;
  dropoff: string;
  ref?: string;
  pickupDate?: string;
  rate?: number;
  shipperName?: string;
  notes?: string;
  status?: LoadStatus;
};
