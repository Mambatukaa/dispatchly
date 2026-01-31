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
  brokerName?: string;
  shipperName?: string;
  notes?: string;
};

export type CreateLoadInput = {
  ref: string;
  pickup: string;
  dropoff: string;
  pickupDate: string;
  driverId?: string;
  rate?: number;
  brokerName?: string;
  shipperName?: string;
  notes?: string;
  status?: LoadStatus;
};

export type UpdateLoadInput = {
  ref?: string;
  status?: LoadStatus;
  driverId?: string;
  pickup?: string;
  dropoff?: string;
  pickupDate?: string;
  rate?: number;
  brokerName?: string;
  shipperName?: string;
  notes?: string;
};
